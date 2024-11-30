import { NextResponse } from 'next/server';
import { connectToDatabase, Analytics } from '@/lib/mongodb';
import { AnalyticsData } from '@/types/analytics';
import { Document } from 'mongoose';

type AnalyticsDocument = Document & AnalyticsData;

export async function GET() {
  console.log('GET /api/analytics - Starting request');
  try {
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('MongoDB connected successfully');

    console.log('Fetching analytics data...');
    const rawData = await Analytics.findOne({}).lean().exec();
    
    const defaultData: AnalyticsData = {
      totalVisitors: 0,
      dailyVisitors: {},
      pageViews: {},
      visitorsByCountry: {},
      recentVisits: []
    };

    const data: AnalyticsData = rawData ? {
      totalVisitors: (rawData as any).totalVisitors ?? defaultData.totalVisitors,
      dailyVisitors: (rawData as any).dailyVisitors ?? defaultData.dailyVisitors,
      pageViews: (rawData as any).pageViews ?? defaultData.pageViews,
      visitorsByCountry: (rawData as any).visitorsByCountry ?? defaultData.visitorsByCountry,
      recentVisits: (rawData as any).recentVisits ?? defaultData.recentVisits
    } : defaultData;

    // Fix visitorsByCountry counts based on recentVisits
    const countryMap = new Map<string, number>();
    data.recentVisits.forEach((visit: { country: string }) => {
      const country = visit.country.toUpperCase();
      if (country !== 'UNKNOWN' && country.length === 2) {
        countryMap.set(country, (countryMap.get(country) || 0) + 1);
      }
    });

    // Update the visitorsByCountry object
    data.visitorsByCountry = Object.fromEntries(countryMap);

    // Save the corrected data
    if ('_id' in data) {
      await Analytics.findByIdAndUpdate(data._id, { 
        $set: { visitorsByCountry: data.visitorsByCountry } 
      });
    }

    console.log('Analytics data fetched and corrected:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch analytics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  console.log('POST /api/analytics - Starting request');
  try {
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('MongoDB connected successfully');

    const visit = await request.json();
    console.log('Received visit data:', visit);

    // Validate and normalize country code
    const country = (visit.country || '').toUpperCase();
    if (!country || country === 'UNKNOWN' || country === 'TEST' || country.length !== 2) {
      console.warn('Invalid country code received:', country);
      return NextResponse.json({ error: 'Invalid country code' }, { status: 400 });
    }

    // Find existing analytics or create new one using findOneAndUpdate
    console.log('Finding or creating analytics document...');
    const defaultData: AnalyticsData = {
      totalVisitors: 0,
      dailyVisitors: {},
      pageViews: {},
      visitorsByCountry: {},
      recentVisits: []
    };

    // Always create or get a valid analytics document
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics(defaultData);
      await analytics.save();
    }

    // At this point, analytics is guaranteed to be non-null
    analytics = analytics as AnalyticsDocument;

    // Update total visitors
    analytics.totalVisitors = (analytics.totalVisitors || 0) + 1;

    // Update daily visitors
    const today = new Date().toISOString().split('T')[0];
    analytics.dailyVisitors = analytics.dailyVisitors || {};
    analytics.dailyVisitors[today] = (analytics.dailyVisitors[today] || 0) + 1;

    // Update page views
    const page = visit.page || '/';
    analytics.pageViews = analytics.pageViews || {};
    analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;

    // Update visitors by country
    analytics.visitorsByCountry = analytics.visitorsByCountry || {};
    analytics.visitorsByCountry[country] = (analytics.visitorsByCountry[country] || 0) + 1;

    // Add to recent visits (keep last 100)
    const newVisit = {
      timestamp: new Date().toISOString(),
      country: country,
      page: page,
      userAgent: visit.userAgent || 'Unknown'
    };

    analytics.recentVisits = analytics.recentVisits || [];
    analytics.recentVisits.unshift(newVisit);
    analytics.recentVisits = analytics.recentVisits.slice(0, 100);

    // Recount all countries from recentVisits to ensure accuracy
    const countryMap = new Map<string, number>();
    analytics.recentVisits.forEach((visit: { country: string }) => {
      const visitCountry = visit.country.toUpperCase();
      if (visitCountry !== 'UNKNOWN' && visitCountry.length === 2) {
        countryMap.set(visitCountry, (countryMap.get(visitCountry) || 0) + 1);
      }
    });

    // Update visitorsByCountry with accurate counts
    analytics.visitorsByCountry = Object.fromEntries(countryMap);

    // Save to MongoDB
    console.log('Saving analytics to MongoDB...');
    const updatedAnalytics = await analytics.save();
    
    // Verify the save
    console.log('Save successful. Verifying country data...', {
      savedCountries: Object.keys(updatedAnalytics.visitorsByCountry),
      countryCounts: updatedAnalytics.visitorsByCountry
    });

    return NextResponse.json(updatedAnalytics);
  } catch (error: any) {
    console.error('Failed to update analytics:', error);
    console.error('Error details:', {
      name: error.name || 'UnknownError',
      message: error.message || 'Unknown error occurred',
      stack: error.stack || 'No stack trace available'
    });
    return NextResponse.json({ 
      error: error.message || 'Failed to update analytics'
    }, { 
      status: 500 
    });
  }
}

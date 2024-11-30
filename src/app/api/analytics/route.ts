import { NextResponse } from 'next/server';
import { connectToDatabase, Analytics } from '@/lib/mongodb';
import { AnalyticsData } from '@/types/analytics';

export async function GET() {
  console.log('GET /api/analytics - Starting request');
  try {
    console.log('Connecting to MongoDB...');
    await connectToDatabase();
    console.log('MongoDB connected successfully');

    console.log('Fetching analytics data...');
    const data = await Analytics.findOne({}).lean() || {
      totalVisitors: 0,
      dailyVisitors: {},
      pageViews: {},
      visitorsByCountry: {},
      recentVisits: []
    };
    console.log('Analytics data fetched:', data);

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
    
    // Find existing analytics or create new one
    console.log('Finding existing analytics...');
    let analytics = await Analytics.findOne({});
    console.log('Existing analytics:', analytics);

    if (!analytics) {
      console.log('No existing analytics found, creating new document');
      analytics = new Analytics({
        totalVisitors: 0,
        dailyVisitors: {},
        pageViews: {},
        visitorsByCountry: {},
        recentVisits: []
      });
    }

    // Update total visitors
    analytics.totalVisitors = (analytics.totalVisitors || 0) + 1;
    console.log('Updated total visitors:', analytics.totalVisitors);

    // Update daily visitors
    const today = new Date().toISOString().split('T')[0];
    analytics.dailyVisitors = analytics.dailyVisitors || {};
    analytics.dailyVisitors[today] = (analytics.dailyVisitors[today] || 0) + 1;
    console.log('Updated daily visitors:', analytics.dailyVisitors);

    // Update page views
    const page = visit.page || '/';
    analytics.pageViews = analytics.pageViews || {};
    analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;
    console.log('Updated page views:', analytics.pageViews);

    // Update visitors by country
    const country = visit.country || 'Unknown';
    analytics.visitorsByCountry = analytics.visitorsByCountry || {};
    analytics.visitorsByCountry[country] = (analytics.visitorsByCountry[country] || 0) + 1;
    console.log('Updated visitors by country:', analytics.visitorsByCountry);

    // Add to recent visits (keep last 100)
    analytics.recentVisits = analytics.recentVisits || [];
    analytics.recentVisits.unshift({
      timestamp: new Date().toISOString(),
      country: country,
      page: page,
      userAgent: visit.userAgent || 'Unknown'
    });
    analytics.recentVisits = analytics.recentVisits.slice(0, 100);
    console.log('Updated recent visits, new count:', analytics.recentVisits.length);

    // Save to MongoDB
    console.log('Saving analytics to MongoDB...');
    const updatedAnalytics = await analytics.save();
    console.log('Analytics saved successfully. Document ID:', updatedAnalytics._id);
    
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
    }, { status: 500 });
  }
}

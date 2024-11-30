import { NextResponse } from 'next/server';
import { connectToDatabase, Analytics } from '@/lib/mongodb';

export async function GET() {
  console.log('Testing MongoDB connection and analytics...');
  try {
    // Test connection
    console.log('Connecting to MongoDB...');
    const mongoose = await connectToDatabase();
    console.log('Connection state:', mongoose.connection.readyState);
    console.log('Database name:', mongoose.connection.name);
    console.log('Connected to:', mongoose.connection.host);

    // Test data creation
    console.log('Creating test analytics document...');
    const testAnalytics = new Analytics({
      totalVisitors: 1,
      dailyVisitors: { '2024-01-01': 1 },
      pageViews: { '/test': 1 },
      visitorsByCountry: { 'TEST': 1 },
      recentVisits: [{
        timestamp: new Date().toISOString(),
        country: 'TEST',
        page: '/test',
        userAgent: 'Test Agent'
      }]
    });

    // Save test data
    console.log('Saving test data...');
    const saved = await testAnalytics.save();
    console.log('Test data saved successfully:', saved._id);

    // Verify data was saved
    console.log('Verifying saved data...');
    const found = await Analytics.findById(saved._id);
    console.log('Found saved data:', found);

    return NextResponse.json({
      success: true,
      connectionState: mongoose.connection.readyState,
      database: mongoose.connection.name,
      savedId: saved._id,
      foundData: found
    });
  } catch (error: any) {
    console.error('Test failed:', error);
    return NextResponse.json({
      success: false,
      error: {
        message: error.message || 'Unknown error occurred',
        name: error.name || 'UnknownError',
        stack: error.stack || 'No stack trace available'
      }
    }, { status: 500 });
  }
}

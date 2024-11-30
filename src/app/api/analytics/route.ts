import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'analytics.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read analytics data
async function readAnalyticsData() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      totalVisitors: 0,
      dailyVisitors: {},
      pageViews: {},
      visitorsByCountry: {},
      recentVisits: []
    };
  }
}

// Write analytics data
async function writeAnalyticsData(data: any) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = await readAnalyticsData();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const visit = await request.json();
  const data = await readAnalyticsData();
  
  // Update total visitors
  data.totalVisitors++;

  // Update daily visitors
  const today = new Date().toISOString().split('T')[0];
  data.dailyVisitors[today] = (data.dailyVisitors[today] || 0) + 1;

  // Clean up old daily data (keep last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  Object.keys(data.dailyVisitors).forEach(date => {
    if (new Date(date) < thirtyDaysAgo) {
      delete data.dailyVisitors[date];
    }
  });

  // Update page views
  data.pageViews[visit.page] = (data.pageViews[visit.page] || 0) + 1;

  // Update visitors by country
  if (visit.country) {
    data.visitorsByCountry[visit.country] = 
      (data.visitorsByCountry[visit.country] || 0) + 1;
  }

  // Add to recent visits
  data.recentVisits.unshift({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    page: visit.page,
    country: visit.country
  });

  // Keep only last 50 visits
  data.recentVisits = data.recentVisits.slice(0, 50);

  await writeAnalyticsData(data);
  return NextResponse.json(data);
}

export interface AnalyticsData {
  totalVisitors: number;
  dailyVisitors: Record<string, number>;
  pageViews: Record<string, number>;
  visitorsByCountry: Record<string, number>;
  recentVisits: Array<{
    timestamp: string;
    country: string;
    page: string;
    userAgent: string;
  }>;
}

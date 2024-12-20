export interface AnalyticsData {
  totalVisitors: number;
  dailyVisitors: Record<string, number>;
  visitorsByCountry: Record<string, number>;
  recentVisits: Array<{
    timestamp: string;
    country: string;
    city: string;
    page: string;
    userAgent: string;
  }>;
}

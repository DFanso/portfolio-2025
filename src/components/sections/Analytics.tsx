'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/utils/analytics";
import { AnalyticsData } from "@/types/analytics";

const StatCard = ({ title, value, suffix = "" }: { title: string; value: number; suffix?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-zinc-900 p-6 rounded-lg border border-[var(--green)] relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--green)] opacity-10 transform rotate-45 translate-x-8 -translate-y-8" />
    <h3 className="text-zinc-400 text-sm mb-2">{title}</h3>
    <p className="text-3xl font-bold text-[var(--green)]">
      {value.toLocaleString()}{suffix}
    </p>
  </motion.div>
);

const BarChart = ({ data, title }: { data: { label: string; value: number }[]; title: string }) => (
  <div className="bg-zinc-900 p-6 rounded-lg border border-[var(--green)]">
    <h3 className="text-zinc-400 text-sm mb-4">{title}</h3>
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.label}</span>
            <span className="text-[var(--green)]">{item.value.toLocaleString()}</span>
          </div>
          <motion.div
            className="h-2 bg-zinc-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className="h-full bg-[var(--green)]"
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  </div>
);

const RecentVisits = ({ visits }: { visits: AnalyticsData['recentVisits'] }) => (
  <div className="bg-zinc-900 p-6 rounded-lg border border-[var(--green)]">
    <h3 className="text-zinc-400 text-sm mb-4">Recent Visits</h3>
    <div className="space-y-4">
      {visits.map((visit, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex justify-between text-sm border-b border-zinc-800 pb-2"
        >
          <span className="text-zinc-400">
            {new Date(visit.timestamp).toLocaleString()}
          </span>
          <span className="text-[var(--green)]">
            {visit.country}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

export function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch and update data
    const fetchData = async () => {
      try {
        setLoading(true);
        const analyticsData = await getAnalytics();
        if (analyticsData) {
          setData(analyticsData);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--green)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!data) return null;

  // Calculate daily visitors (today)
  const today = new Date().toISOString().split('T')[0];
  const dailyVisitors = data.dailyVisitors[today] || 0;

  // Convert country data to array format
  const countryArray = Object.entries(data.visitorsByCountry)
    .map(([country, visitors]) => ({
      label: country,
      value: visitors,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Show top 5

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Visitors" value={data.totalVisitors} />
        <StatCard title="Daily Visitors" value={dailyVisitors} />
        <StatCard title="Countries" value={Object.keys(data.visitorsByCountry).length} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6">
        <BarChart data={countryArray} title="Visitors by Country" />
      </div>

      {/* Recent Visits */}
      <RecentVisits visits={data.recentVisits} />
    </div>
  );
}

'use client';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/utils/analytics";

interface VisitorData {
  totalVisitors: number;
  dailyVisitors: { [key: string]: number };
  pageViews: { [key: string]: number };
  visitorsByCountry: { [key: string]: number };
  recentVisits: {
    id: string;
    timestamp: string;
    page: string;
    country: string;
  }[];
}

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
              transition={{ duration: 1, delay: index * 0.1 }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  </div>
);

const RecentVisits = ({ visits }: { visits: VisitorData["recentVisits"] }) => (
  <div className="bg-zinc-900 p-6 rounded-lg border border-[var(--green)]">
    <h3 className="text-zinc-400 text-sm mb-4">Recent Visits</h3>
    <div className="space-y-4">
      {visits.map((visit) => (
        <motion.div
          key={visit.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between border-b border-zinc-800 pb-2"
        >
          <div>
            <p className="text-sm">{visit.page}</p>
            <p className="text-xs text-zinc-500">
              {new Date(visit.timestamp).toLocaleTimeString()}
            </p>
          </div>
          <span className="text-xs px-2 py-1 bg-zinc-800 rounded">
            {visit.country}
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

export function Analytics() {
  const [data, setData] = useState<VisitorData | null>(null);

  useEffect(() => {
    // Function to fetch and update data
    const fetchData = async () => {
      const analyticsData = await getAnalytics();
      if (analyticsData) {
        setData(analyticsData);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  // Calculate daily visitors (today)
  const today = new Date().toISOString().split('T')[0];
  const dailyVisitors = data.dailyVisitors[today] || 0;

  // Convert page views to array format
  const pageViewsArray = Object.entries(data.pageViews).map(([page, views]) => ({
    label: page,
    value: views,
  })).sort((a, b) => b.value - a.value);

  // Convert country data to array format
  const countryArray = Object.entries(data.visitorsByCountry).map(([country, visitors]) => ({
    label: country,
    value: visitors,
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Visitors" value={data.totalVisitors} />
        <StatCard title="Daily Visitors" value={dailyVisitors} />
        <StatCard title="Total Pages" value={Object.keys(data.pageViews).length} />
        <StatCard 
          title="Most Visited Page" 
          value={pageViewsArray[0]?.value || 0} 
          suffix={` (${pageViewsArray[0]?.label || 'None'})`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Page Views"
          data={pageViewsArray}
        />
        <BarChart
          title="Visitors by Country"
          data={countryArray}
        />
      </div>

      {/* Recent Visits */}
      <RecentVisits visits={data.recentVisits} />
    </div>
  );
}

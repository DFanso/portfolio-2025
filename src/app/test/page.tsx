'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test MongoDB connection
    fetch('/api/analytics/test')
      .then(res => res.json())
      .then(data => {
        console.log('Test result:', data);
        setTestResult(data);
      })
      .catch(err => {
        console.error('Test error:', err);
        setError(err.message);
      });

    // Test analytics endpoint
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        console.log('Analytics data:', data);
        setAnalyticsData(data);
      })
      .catch(err => {
        console.error('Analytics error:', err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">MongoDB Connection Test</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Test Results:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-2">Analytics Data:</h2>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(analyticsData, null, 2)}
          </pre>
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            fetch('/api/analytics', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                page: '/test',
                country: 'TEST',
                userAgent: navigator.userAgent,
              }),
            })
              .then(res => res.json())
              .then(data => {
                console.log('Analytics updated:', data);
                // Refresh analytics data
                return fetch('/api/analytics');
              })
              .then(res => res.json())
              .then(data => {
                setAnalyticsData(data);
              })
              .catch(err => {
                console.error('Update error:', err);
                setError(err.message);
              });
          }}
        >
          Test Analytics Update
        </button>
      </div>
    </div>
  );
}

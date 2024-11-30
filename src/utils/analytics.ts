// Function to get visitor's country using a free IP geolocation API
async function getVisitorCountry(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

// Function to track a page visit
export async function trackPageView(page: string) {
  const visitKey = `visit_${page}_${new Date().toISOString().split('T')[0]}`;
  
  // Check if we've already tracked this visit today
  if (localStorage.getItem(visitKey)) {
    return;
  }

  // Mark this visit as tracked
  localStorage.setItem(visitKey, 'true');

  // Get country and record the visit
  const country = await getVisitorCountry();
  
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        country,
        timestamp: new Date().toISOString()
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Function to get analytics data
export async function getAnalytics() {
  try {
    const response = await fetch('/api/analytics');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return null;
  }
}

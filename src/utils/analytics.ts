// Cache for country data to avoid hitting rate limits
const COUNTRY_CACHE_KEY = 'visitor_country';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedCountry {
  country: string;
  timestamp: number;
}

// Function to get visitor's country using multiple IP geolocation APIs
async function getVisitorCountry(): Promise<string> {
  try {
    // Check cache first
    const cachedData = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (cachedData) {
      const parsed: CachedCountry = JSON.parse(cachedData);
      const now = Date.now();
      if (now - parsed.timestamp < CACHE_DURATION) {
        console.log('Using cached country:', parsed.country);
        return parsed.country;
      }
    }

    // Try ipapi.co first
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        if (data.country_code) {
          // Cache the result
          localStorage.setItem(COUNTRY_CACHE_KEY, JSON.stringify({
            country: data.country_code,
            timestamp: Date.now()
          }));
          console.log('Country detected from ipapi.co:', data.country_code);
          return data.country_code;
        }
      }
      // If we get here, ipapi.co failed or returned invalid data
      throw new Error('ipapi.co failed or returned invalid data');
    } catch (ipapiError) {
      console.warn('ipapi.co failed:', ipapiError);
      
      // Fallback to ip-api.com
      const response = await fetch('http://ip-api.com/json/');
      if (response.ok) {
        const data = await response.json();
        if (data.countryCode) {
          // Cache the result
          localStorage.setItem(COUNTRY_CACHE_KEY, JSON.stringify({
            country: data.countryCode,
            timestamp: Date.now()
          }));
          console.log('Country detected from ip-api.com:', data.countryCode);
          return data.countryCode;
        }
      }
      throw new Error('Both geolocation services failed');
    }
  } catch (error) {
    console.error('Failed to detect country:', error);
    // Return cached country if available, even if expired
    try {
      const cachedData = localStorage.getItem(COUNTRY_CACHE_KEY);
      if (cachedData) {
        const parsed: CachedCountry = JSON.parse(cachedData);
        console.log('Using expired cached country as fallback:', parsed.country);
        return parsed.country;
      }
    } catch (cacheError) {
      console.error('Failed to read country cache:', cacheError);
    }
    return 'Unknown';
  }
}

// Function to track a page visit
export async function trackPageView(page: string) {
  try {
    const visitKey = `visit_${page}_${new Date().toISOString().split('T')[0]}`;
    
    // Check if we've already tracked this visit today
    if (localStorage.getItem(visitKey)) {
      return;
    }

    // Get country and record the visit
    const country = await getVisitorCountry();
    console.log('Tracking page view with country:', country);
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        country,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track page view');
    }

    // Only mark as tracked if the request was successful
    localStorage.setItem(visitKey, 'true');

    const data = await response.json();
    console.log('Page view tracked successfully:', data);
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Function to get analytics data
export async function getAnalytics() {
  try {
    const response = await fetch('/api/analytics');
    if (!response.ok) {
      throw new Error('Failed to fetch analytics data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return null;
  }
}

// Cache for country data to avoid hitting rate limits
const COUNTRY_CACHE_KEY = 'visitor_country';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedCountry {
  country: string;
  city: string;
  timestamp: number;
}

// Function to get visitor's country and city using multiple IP geolocation APIs
async function getVisitorCountry(): Promise<{ country: string; city: string }> {
  try {
    // Check cache first
    const cachedData = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (cachedData) {
      try {
        const parsed: CachedCountry = JSON.parse(cachedData);
        const now = Date.now();
        if (now - parsed.timestamp < CACHE_DURATION && parsed.country !== 'Unknown' && parsed.country !== 'test') {
          console.log('Using cached country and city:', parsed.country, parsed.city);
          return { country: parsed.country, city: parsed.city };
        }
      } catch (cacheError) {
        console.warn('Failed to parse cached country data:', cacheError);
        localStorage.removeItem(COUNTRY_CACHE_KEY);
      }
    }

    // Try ipapi.co first
    try {
      console.log('Attempting to get country and city from ipapi.co...');
      const response = await fetch('https://ipapi.co/json/', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Portfolio Analytics)'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.country_code && typeof data.country_code === 'string' && data.country_code.length === 2 && data.city) {
          const country = data.country_code.toUpperCase();
          const city = data.city;
          // Cache the result
          localStorage.setItem(COUNTRY_CACHE_KEY, JSON.stringify({
            country: country,
            city: city,
            timestamp: Date.now()
          }));
          console.log('Country and city detected from ipapi.co:', country, city);
          return { country, city };
        } else {
          console.warn('Invalid country code or city from ipapi.co:', data);
          throw new Error('Invalid country code or city from ipapi.co');
        }
      } else {
        console.warn('ipapi.co response not ok:', response.status);
        throw new Error(`ipapi.co failed with status ${response.status}`);
      }
    } catch (ipapiError) {
      console.warn('ipapi.co failed:', ipapiError);
      
      // Fallback to ip-api.com with HTTPS
      try {
        console.log('Attempting to get country and city from ip-api.com...');
        const response = await fetch('https://ip-api.com/json/', {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Portfolio Analytics)'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.countryCode && typeof data.countryCode === 'string' && data.countryCode.length === 2 && data.city) {
            const country = data.countryCode.toUpperCase();
            const city = data.city;
            // Cache the result
            localStorage.setItem(COUNTRY_CACHE_KEY, JSON.stringify({
              country: country,
              city: city,
              timestamp: Date.now()
            }));
            console.log('Country and city detected from ip-api.com:', country, city);
            return { country, city };
          } else {
            console.warn('Invalid country code or city from ip-api.com:', data);
            throw new Error('Invalid country code or city from ip-api.com');
          }
        } else {
          console.warn('ip-api.com response not ok:', response.status);
          throw new Error(`ip-api.com failed with status ${response.status}`);
        }
      } catch (ipApiError) {
        console.error('Both geolocation services failed:', { ipapiError, ipApiError });
        throw new Error('All geolocation services failed');
      }
    }
  } catch (error) {
    console.error('Failed to detect country and city:', error);
    // Return cached country and city if available, even if expired
    try {
      const cachedData = localStorage.getItem(COUNTRY_CACHE_KEY);
      if (cachedData) {
        const parsed: CachedCountry = JSON.parse(cachedData);
        if (parsed.country !== 'Unknown' && parsed.country !== 'test') {
          console.log('Using expired cached country and city as fallback:', parsed.country, parsed.city);
          return { country: parsed.country, city: parsed.city };
        }
      }
    } catch (cacheError) {
      console.error('Failed to read country cache:', cacheError);
    }
    return { country: 'Unknown', city: 'Unknown' };
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

    // Get country and city and record the visit
    const { country, city } = await getVisitorCountry();
    
    // Validate country code before sending
    if (!country || country === 'test' || country === 'Unknown' || country.length !== 2) {
      console.warn('Invalid country code detected:', country);
      return;
    }
    
    console.log('Tracking page view with country and city:', country, city);
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        page,
        country,
        city,
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

// Function to track a visit
export async function trackVisit() {
  try {
    const { country, city } = await getVisitorCountry();
    
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
        city,
        page: window.location.pathname,
        userAgent: window.navigator.userAgent,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to track visit');
    }
  } catch (error) {
    console.error('Failed to track visit:', error);
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

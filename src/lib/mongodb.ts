import mongoose from 'mongoose';
import { AnalyticsData } from '@/types/analytics';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// After the check, we can safely assert that MONGODB_URI is a string
const uri: string = MONGODB_URI;

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    if (cached.conn) {
      console.log('Using cached MongoDB connection');
      return cached.conn;
    }

    if (!cached.promise) {
      console.log('Creating new MongoDB connection...');
      const opts = {
        bufferCommands: true,
      };

      cached.promise = mongoose.connect(uri, opts);
    }

    cached.conn = await cached.promise;
    console.log('Successfully connected to MongoDB');
    return cached.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

const analyticsSchema = new mongoose.Schema<AnalyticsData>({
  totalVisitors: { type: Number, default: 0 },
  dailyVisitors: { 
    type: Object, 
    default: {} 
  },
  pageViews: { 
    type: Object, 
    default: {} 
  },
  visitorsByCountry: { 
    type: Object, 
    default: {} 
  },
  recentVisits: [{
    timestamp: { type: String, required: true },
    country: { type: String, required: true },
    page: { type: String, required: true },
    userAgent: { type: String, required: true }
  }]
}, {
  timestamps: true,
  strict: false
});

export const Analytics = mongoose.models.Analytics || mongoose.model<AnalyticsData>('Analytics', analyticsSchema);

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

// Analytics Schema
const analyticsSchema = new mongoose.Schema<AnalyticsData>({
  totalVisitors: { 
    type: Number, 
    required: true,
    min: 0
  },
  dailyVisitors: { 
    type: Object,
    default: () => ({})
  },
  visitorsByCountry: { 
    type: Object,
    default: () => ({}),
    validate: {
      validator(v: Record<string, number>) {
        return Object.entries(v).every(([country, count]) => 
          typeof country === 'string' && 
          country.length === 2 && 
          typeof count === 'number' && 
          count >= 0
        );
      },
      message: 'visitorsByCountry must have 2-letter country codes and non-negative values'
    }
  },
  recentVisits: [{
    timestamp: { type: String, required: true },
    country: { 
      type: String, 
      required: true,
      validate: {
        validator: (v: string) => v.length === 2,
        message: 'Country code must be a valid 2-letter code'
      }
    },
    city: { type: String, required: true },
    page: { type: String, required: true },
    userAgent: { type: String, required: true }
  }]
}, {
  timestamps: true,
  strict: true // Change to true to enforce schema validation
});

// Ensure indexes for better query performance
analyticsSchema.index({ 'recentVisits.timestamp': -1 });
analyticsSchema.index({ createdAt: 1 });
analyticsSchema.index({ updatedAt: 1 });

// Pre-save middleware to ensure all country codes are uppercase
analyticsSchema.pre('save', function(next) {
  if (this.isModified('visitorsByCountry') || this.isModified('recentVisits')) {
    // Convert country codes to uppercase in visitorsByCountry
    const newVisitorsByCountry: Record<string, number> = {};
    Object.entries(this.visitorsByCountry).forEach(([key, value]) => {
      newVisitorsByCountry[key.toUpperCase()] = value;
    });
    this.visitorsByCountry = newVisitorsByCountry;

    // Convert country codes to uppercase in recentVisits
    this.recentVisits = this.recentVisits.map(visit => ({
      ...visit,
      country: visit.country.toUpperCase()
    }));
  }
  next();
});

// Analytics Model
export const Analytics = mongoose.models.Analytics || mongoose.model<AnalyticsData>('Analytics', analyticsSchema);

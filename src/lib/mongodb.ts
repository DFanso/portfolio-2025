import mongoose from 'mongoose';
import { AnalyticsData } from '@/types/analytics';

const MONGODB_URI = 'mongodb+srv://dfanso:Tqy6PthnyrnVTFVB@cluster0.4ybsw.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

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
        dbName: 'portfolio', // Explicitly set database name
      };

      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('New MongoDB connection created');
        return mongoose;
      });
    } else {
      console.log('Using existing connection promise');
    }

    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    cached.promise = null;
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
  strict: false, // Allow dynamic object properties
  collection: 'analytics' // Explicitly set collection name
});

// Data retention - keep records for 90 days by default
analyticsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export const Analytics = mongoose.models.Analytics || mongoose.model<AnalyticsData>('Analytics', analyticsSchema);

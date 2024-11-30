import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase, Analytics } from '@/lib/mongodb';

interface IBackup {
  timestamp: Date;
  data: any[];
  metadata: {
    recordCount: number;
    backupType: string;
  };
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build query
    const query: any = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Get data
    const data = await Analytics.find(query);

    // Format response based on requested format
    if (format === 'csv') {
      const csvRows = [
        ['Date', 'Total Visitors', 'Daily Visitors', 'Page Views', 'Countries'].join(',')
      ];

      data.forEach(record => {
        csvRows.push([
          record.createdAt,
          record.totalVisitors,
          JSON.stringify(Object.fromEntries(record.dailyVisitors)),
          JSON.stringify(Object.fromEntries(record.pageViews)),
          JSON.stringify(Object.fromEntries(record.visitorsByCountry))
        ].join(','));
      });

      return new NextResponse(csvRows.join('\n'), {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename=analytics-export-${new Date().toISOString().split('T')[0]}.csv`
        }
      });
    }

    // Default JSON response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export analytics data' }, { status: 500 });
  }
}

// Backup endpoint
export async function POST() {
  try {
    await connectToDatabase();
    const data = await Analytics.find({});
    
    // Create backup with timestamp
    const backup: IBackup = {
      timestamp: new Date(),
      data: data,
      metadata: {
        recordCount: data.length,
        backupType: 'full'
      }
    };

    // Store backup in MongoDB
    const backupSchema = new mongoose.Schema<IBackup>({
      timestamp: Date,
      data: Array,
      metadata: Object
    });

    const Backup = mongoose.models.Backup || mongoose.model<IBackup>('Backup', backupSchema);
    await Backup.create(backup);

    return NextResponse.json({ 
      message: 'Backup created successfully',
      timestamp: backup.timestamp,
      recordCount: backup.metadata.recordCount
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create backup' }, { status: 500 });
  }
}

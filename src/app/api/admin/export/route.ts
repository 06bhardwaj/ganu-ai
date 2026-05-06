import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Chat from '@/models/Chat';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const collection = searchParams.get('collection');

    await connectDB();

    let data;
    if (collection === 'users') {
      data = await User.find({}).select('-password');
    } else if (collection === 'chats') {
      data = await Chat.find({});
    } else {
      return NextResponse.json({ message: 'Invalid collection' }, { status: 400 });
    }

    const jsonString = JSON.stringify(data, null, 2);
    
    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename=ganu_${collection}_export.json`,
      },
    });

  } catch (error: any) {
    console.error('Export API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

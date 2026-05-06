import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Chat from '@/models/Chat';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const totalUsers = await User.countDocuments();
    const totalChats = await Chat.countDocuments();
    
    // Get all chats to count messages (simplified for demo)
    const chats = await Chat.find({}, 'messages');
    let totalMessages = 0;
    chats.forEach(chat => {
      totalMessages += chat.messages.length;
    });

    const recentUsers = await User.find({}, 'name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalChats,
        totalMessages,
        uptime: '99.99%',
      },
      recentUsers
    });
  } catch (error) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

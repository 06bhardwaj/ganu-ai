import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Chat from '@/models/Chat';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { messages, chatId } = await req.json();
    const userId = (session.user as any).id;

    await connectDB();

    // 1. Get AI response from Pollinations.ai (100% Free, No Key Required)
    let aiContent = "";
    
    try {
      // Pollinations.ai provides a completely free, anonymous AI API
      const response = await axios.post('https://text.pollinations.ai/', {
        messages: [
          { role: 'system', content: 'You are Ganu AI, a premium and helpful AI assistant. You provide concise and intelligent answers.' },
          ...messages.map((m: any) => ({
            role: m.role,
            content: m.content,
          }))
        ],
        model: 'openai', // Use their default high-quality model
        seed: Math.floor(Math.random() * 1000000), // For variety
        jsonMode: false
      });

      aiContent = typeof response.data === 'string' ? response.data : response.data.choices?.[0]?.message?.content || "I couldn't generate a response.";
    } catch (apiError: any) {
      console.error('Pollinations API Error:', apiError.message);
      
      // FALLBACK: If even the free API fails, use our Smart Demo Mode
      const userText = messages[messages.length - 1].content.toLowerCase();
      
      if (userText.includes('hello') || userText.includes('hi')) {
        aiContent = "Hello! I am Ganu AI, your premium digital assistant. How can I help you today?";
      } else {
        aiContent = "I am Ganu AI. I'm currently processing your request. Feel free to explore my dashboard while I analyze your query!";
      }
    }

    // 2. Save to database
    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if (chat && chat.userId.toString() === userId) {
        chat.messages = [
          ...messages,
          { role: 'assistant', content: aiContent, timestamp: new Date() }
        ];
        await chat.save();
      }
    } else {
      // Create new chat
      const title = messages[0].content.substring(0, 30) + (messages[0].content.length > 30 ? "..." : "");
      chat = await Chat.create({
        userId,
        title,
        messages: [
          ...messages,
          { role: 'assistant', content: aiContent, timestamp: new Date() }
        ],
      });
    }

    return NextResponse.json({
      role: 'assistant',
      content: aiContent,
      chatId: chat?._id,
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);

    // If it's a quota error, we already handled it in the inner try-catch fallback
    // This outer block handles database or other major failures
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

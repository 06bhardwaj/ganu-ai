import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'User registered successfully', user: { id: user._id, email: user.email, name: user.name } },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Provide more specific error message
    console.error('FULL ERROR:', error);
    
    if (error.name === 'MongooseServerSelectionError') {
      return NextResponse.json(
        { message: 'Database connection failed. Please ensure your IP is whitelisted in MongoDB Atlas.' }, 
        { status: 500 }
      );
    }

    return NextResponse.json({ message: `Error: ${error.message || 'Internal server error'}` }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await connectDB();

    const adminEmail = 'admin@ganu.ai';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'Admin already exists', 
        email: adminEmail,
        password: 'admin123 (provided during initial seed)' 
      });
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    return NextResponse.json({
      message: 'Admin account created successfully!',
      email: adminEmail,
      password: 'admin123',
      note: 'Please change this password after your first login.'
    });

  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ message: 'Error creating admin' }, { status: 500 });
  }
}

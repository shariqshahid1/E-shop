import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { getBackendUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { name, email } = await request.json();

    await connectDB();
    const updatedUser = await User.findById(user._id);

    if (updatedUser) {
      updatedUser.name = name || updatedUser.name;
      updatedUser.email = email || updatedUser.email;
      
      const savedUser = await updatedUser.save();
      return NextResponse.json(savedUser);
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

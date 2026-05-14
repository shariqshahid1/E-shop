import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import { getBackendUser } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await connectDB();
    const id = (await params).id;
    const order = await Order.findById(id).populate('user', 'name email');

    if (order) {
      // Check if order belongs to user or if user is admin
      if (order.user._id.toString() === user._id.toString() || user.isAdmin) {
        return NextResponse.json(order);
      } else {
        return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await connectDB();
    const id = (await params).id;
    const order = await Order.findById(id);

    if (order) {
      const { id: paymentId, status, update_time, email_address } = await request.json();
      
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: paymentId,
        status,
        update_time,
        email_address,
      };

      const updatedOrder = await order.save();
      return NextResponse.json(updatedOrder);
    } else {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

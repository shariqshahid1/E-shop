import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getBackendUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return NextResponse.json({ message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ message: 'Invalid payment signature' }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

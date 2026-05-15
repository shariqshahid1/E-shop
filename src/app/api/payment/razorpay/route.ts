import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getBackendUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getBackendUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      return NextResponse.json({ message: 'Razorpay keys are missing' }, { status: 500 });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const { amount } = await request.json();

    const options = {
      amount: amount * 100,
      currency: 'USD',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

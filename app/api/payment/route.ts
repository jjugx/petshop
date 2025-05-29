import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { PaymentRequest } from '@/app/types';

export async function GET(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const payments = await prisma.payment.findMany({
      where: { user_id: user.user_id },
      include: { order: true },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: PaymentRequest = await req.json();
    const order = await prisma.order.findUnique({ where: { order_id: data.order_id } });
    if (!order || order.user_id !== user.user_id) {
      return NextResponse.json({ error: 'Invalid order' }, { status: 400 });
    }

    const payment = await prisma.payment.create({
      data: {
        user_id: user.user_id,
        order_id: data.order_id,
        amount: data.amount,
        payment_method: data.payment_method,
        payment_status: 'completed',
        payment_date: new Date(),
      },
    });

    await prisma.order.update({
      where: { order_id: data.order_id },
      data: { status: 'paid' },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json({ error: 'Failed to create payment' }, { status: 400 });
  }
}
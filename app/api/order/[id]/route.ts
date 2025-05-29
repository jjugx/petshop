import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { OrderWithRelations } from '@/app/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const order: OrderWithRelations | null = await prisma.order.findUnique({
      where: { order_id: parseInt(params.id), user_id: user.user_id },
      include: {
        items: { include: { product: true } },
        promotion: true,
        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}
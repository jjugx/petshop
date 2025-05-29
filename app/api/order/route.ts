import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { OrderRequest, OrderWithRelations } from '@/app/types';

export async function GET(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const orders: OrderWithRelations[] = await prisma.order.findMany({
      where: { user_id: user.user_id },
      include: {
        items: { include: { product: true } },
        promotion: true,
        payment: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: OrderRequest = await req.json();
    const cart = await prisma.cart.findFirst({
      where: { user_id: user.user_id },
      include: { cart_items: { include: { product: true } } },
    });

    if (!cart || !data.items || data.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty or invalid items' }, { status: 400 });
    }

    const total_amount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.unit_price,
      0
    );

    const order: OrderWithRelations = await prisma.order.create({
    data: {
        user_id: user.user_id,
        promotion_id: data.promotion_id || null,
        order_date: new Date(),
        total_amount,
        status: 'pending',
        shipping_address: data.shipping_address,
        payment_method: data.payment_method,
        items: {
        create: data.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
        })),
        },
    },
    include: {
        items: { include: { product: true } }, // ✅ ต้อง include product ด้วย
        promotion: true,
        payment: true,
    },
    });

    await prisma.cart_item.deleteMany({ where: { cart_id: cart.cart_id } });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 400 });
  }
}
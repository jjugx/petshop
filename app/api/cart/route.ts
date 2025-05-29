import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { CartItemRequest } from '@/app/types';

export async function GET(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const cart = await prisma.cart.findFirst({
      where: { user_id: user.user_id },
      include: {
        cart_items: { include: { product: { include: { images: true } } } },
      },
    });

    if (!cart) {
      return NextResponse.json({ cart_id: null, items: [], total_amount: 0 });
    }

    const total_amount = cart.cart_items.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    return NextResponse.json({ ...cart, total_amount });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: CartItemRequest = await req.json();
    let cart = await prisma.cart.findFirst({ where: { user_id: user.user_id } });

    if (!cart) {
      cart = await prisma.cart.create({ data: { user_id: user.user_id } });
    }

    const cartItem = await prisma.cart_item.upsert({
      where: {
        cart_id_product_id: { cart_id: cart.cart_id, product_id: data.product_id },
      },
      update: { quantity: { increment: data.quantity } },
      create: { cart_id: cart.cart_id, product_id: data.product_id, quantity: data.quantity },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 400 });
  }
}
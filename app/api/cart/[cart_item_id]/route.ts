import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { CartItemRequest } from '@/app/types';

export async function PUT(req: NextRequest, { params }: { params: { cart_item_id: string } }) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: CartItemRequest = await req.json();
    const cart = await prisma.cart.findFirst({ where: { user_id: user.user_id } });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const cartItem = await prisma.cart_item.update({
      where: {
        cart_id_product_id: {
          cart_id: cart.cart_id,
          product_id: parseInt(params.cart_item_id),
        },
      },
      data: { quantity: data.quantity },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    return NextResponse.json({ error: 'Failed to update cart item' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { cart_item_id: string } }) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const cart = await prisma.cart.findFirst({ where: { user_id: user.user_id } });
    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    await prisma.cart_item.delete({
      where: {
        cart_id_product_id: {
          cart_id: cart.cart_id,
          product_id: parseInt(params.cart_item_id),
        },
      },
    });

    return NextResponse.json({ message: 'Cart item deleted' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    return NextResponse.json({ error: 'Failed to delete cart item' }, { status: 400 });
  }
}
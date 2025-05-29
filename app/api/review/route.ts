import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { ReviewRequest } from '@/app/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const product_id = searchParams.get('product_id');

  try {
    const reviews = await prisma.review.findMany({
      where: product_id ? { product_id: parseInt(product_id) } : {},
      include: { user: { select: { username: true } } },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: ReviewRequest = await req.json();
    const review = await prisma.review.create({
      data: {
        user_id: user.user_id,
        product_id: data.product_id,
        rating: data.rating,
        comment: data.comment,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 400 });
  }
}
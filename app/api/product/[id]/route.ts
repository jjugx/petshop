import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { ProductWithRelations } from '@/app/types';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { product_id: parseInt(params.id) },
      include: {
        category: true,
        brand: true,
        images: true,
        attributes: true,
        reviews: { include: { user: { select: { username: true } } } },
        productPromotions: { include: { promotion: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productWithAvgRating: ProductWithRelations = {
      ...product,
      average_rating: product.reviews.length
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : null,
    };

    return NextResponse.json(productWithAvgRating);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
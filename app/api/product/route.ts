import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { ProductWithRelations } from '@/app/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category_id = searchParams.get('category_id');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = parseInt(searchParams.get('offset') || '0');

  try {
    const products = await prisma.product.findMany({
      where: category_id ? { category_id: parseInt(category_id) } : {},
      include: {
        category: true,
        brand: true,
        images: true,
        reviews: { select: { rating: true } },
      },
      take: limit,
      skip: offset,
    });

    const productsWithAvgRating: ProductWithRelations[] = products.map(product => ({
      ...product,
      average_rating: product.reviews.length
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : null,
    }));

    return NextResponse.json(productsWithAvgRating);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
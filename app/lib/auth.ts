import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from '@/app/lib/prisma';
import { User } from '@prisma/client';

export async function authenticateToken(req: NextRequest): Promise<User | NextResponse> {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Access denied' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: number };
    const user = await prisma.user.findUnique({ where: { user_id: decoded.user_id } });
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    return user;
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
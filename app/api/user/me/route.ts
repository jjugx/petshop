import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { authenticateToken } from '@/app/lib/auth';
import { UserUpdateRequest } from '@/app/types';

export async function GET(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  return NextResponse.json({
    user_id: user.user_id,
    username: user.username,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    phone: user.phone,
    address: user.address,
  });
}

export async function PUT(req: NextRequest) {
  const user = await authenticateToken(req);
  if (user instanceof NextResponse) return user;

  try {
    const data: UserUpdateRequest = await req.json();
    const updatedUser = await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        address: data.address,
      },
    });

    return NextResponse.json({
      user_id: updatedUser.user_id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      phone: updatedUser.phone,
      address: updatedUser.address,
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}
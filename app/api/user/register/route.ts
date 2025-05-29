import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import bcrypt from 'bcrypt';
import { UserRegisterRequest } from '@/app/types';

export async function POST(req: NextRequest) {
  try {
    const data: UserRegisterRequest = await req.json();

    //เช็ค field ครบมั้ย
    if (!data.username || !data.password || !data.email || !data.firstname || !data.lastname) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    //เช็ค email ซ้ำ
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(data.password, 10);

    //สร้าง user ใหม่
    const user = await prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        address: data.address,
        role: 'customer',
      },
    });

    return NextResponse.json({ user_id: user.user_id, email: user.email }, { status: 201 });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Failed to register' }, { status: 500 });
  }
}
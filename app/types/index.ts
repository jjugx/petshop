import { Prisma } from '@prisma/client';

export interface UserRegisterRequest {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  phone?: string;
  address?: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserUpdateRequest {
  firstname?: string;
  lastname?: string;
  phone?: string;
  address?: string;
}

export interface CartItemRequest {
  product_id: number;
  quantity: number;
}

export interface OrderItemRequest {
  product_id: number;
  quantity: number;
  unit_price: number;
}

export interface OrderRequest {
  shipping_address: string;
  payment_method: string;
  promotion_id?: number;
  items: OrderItemRequest[];
}

export interface PaymentRequest {
  order_id: number;
  amount: number;
  payment_method: string;
}

export interface ReviewRequest {
  product_id: number;
  rating: number;
  comment?: string;
}

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true;
    brand: true;
    images: true;
    reviews: { select: { rating: true } };
  };
}> & { average_rating: number | null };

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    items: { include: { product: true } };
    promotion: true;
    payment: true;
  };
}>;

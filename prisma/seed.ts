const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  await prisma.user.createMany({
    data: [
      { username: 'admin', password: 'admin123', email: 'admin@petshop.com', firstname: 'Admin', lastname: 'Pet', phone: '+66912345678', address: '123 ถนนเพ็ทช็อป กรุงเทพฯ', role: 'Admin' },
      { username: 'customer', password: 'customer123', email: 'customer@petshop.com', firstname: 'Customer', lastname: 'Pet', phone: '+66987654321', address: '456 ถนนสัตว์เลี้ยง กรุงเทพฯ', role: 'Customer' },
    ],
  });

  // Seed Brands
  await prisma.brand.create({ data: { brand_name: 'PetBest', description: 'อาหารสัตว์เลี้ยงคุณภาพ', logo: 'petbest.png' } });

  // Seed Categories
  await prisma.categories.create({ data: { name: 'Pet Food', description: 'อาหารสำหรับสัตว์เลี้ยง' } });

  // Seed Products
  await prisma.product.create({
    data: {
      name: 'อาหารแมว PetBest',
      description: 'อาหารแห้งสำหรับแมว 1 กก.',
      price: 299.99,
      stock_quantity: 100,
      image: 'catfood.png',
      category_id: 1,
      brand_id: 1,
      attributes: {
        create: [
          { attribute_name: 'flavor', attribute_value: 'Tuna', additional_price: 0, stock_quantity: 50 },
          { attribute_name: 'weight', attribute_value: '1kg', additional_price: 0, stock_quantity: 50 },
        ],
      },
    },
  });

  // Seed Promotions
  await prisma.promotion.create({
    data: {
      order_id: 1,
      name: 'PET10',
      description: 'ลด 10% สำหรับสัตว์เลี้ยง',
      discount: 10,
      start_date: new Date(),
      end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  // Seed Product_Promotion
  await prisma.product_Promotion.create({
    data: { promotion_id: 1, product_id: 1 },
  });

  // Seed Categories_Promotion
  await prisma.categories_Promotion.create({
    data: { promotion_id: 1, categories_id: 1 },
  });

  // Seed Orders
  await prisma.order.create({
    data: {
      user_id: 2,
      promotion_id: 1,
      total_amount: 269.99, // 299.99 - 10%
      status: 'pending',
      shipping_address: '456 ถนนสัตว์เลี้ยง กรุงเทพฯ',
      payment_method: 'credit_card',
      items: {
        create: [
          { product_id: 1, quantity: 1, unit_price: 299.99 },
        ],
      },
    },
  });

  // Seed Cart
  await prisma.cart.create({
    data: {
      user_id: 2,
      cart_items: {
        create: [
          { product_id: 1, quantity: 2 },
        ],
      },
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
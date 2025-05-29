'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products }: { title: string; products: any[] }) {
  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
        }}
        className="relative"
        >
        {products.map((product) => (
            <SwiperSlide key={product.id}>
            <ProductCard product={product} />
            </SwiperSlide>
        ))}

        {/* Custom Arrow Styling */}
        <style jsx global>{`
            .swiper-button-prev,
            .swiper-button-next {
            color: #000; /* เปลี่ยนสีตามต้องการ */
            }
        `}</style>
        </Swiper>
    </div>
  );
}

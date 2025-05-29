'use client';

import Navbar from './components/navbar';
import BannerCarousel from './components/BannerCarousel';
import ProductCarousel from './components/ProductCarousel';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const newProducts = [
  { id: 1, name: 'อาหารสุนัข Royal Canin', price: 899, image: '/images/dog1.jpg' },
  { id: 2, name: 'อาหารแมว Me-O', price: 599, image: '/images/cat1.jpg' },
  { id: 3, name: 'วิตามินสัตว์เลี้ยง', price: 199, image: '/images/vitamin.jpg' },
  { id: 4, name: 'ของเล่นลูกบอลแมว', price: 120, image: '/images/toy1.jpg' },
  { id: 5, name: 'อาหารสุนัข Pedigree', price: 750, image: '/images/dog2.jpg' },
  { id: 6, name: 'อาหารแมว Whiskas', price: 650, image: '/images/cat2.jpg' },
  { id: 7, name: 'กรงสุนัขพับได้', price: 1200, image: '/images/cage.jpg' },
  { id: 8, name: 'เสื่อแมวลายการ์ตูน', price: 300, image: '/images/mat.jpg' },
];

const bestSellers = [
  { id: 9, name: 'ทรายแมวแบบจับตัวเป็นก้อน', price: 320, image: '/images/litter.jpg' },
  { id: 10, name: 'ขนมขัดฟันสุนัข', price: 150, image: '/images/dogtreat.jpg' },
  { id: 11, name: 'ปลอกคอแมวลายน่ารัก', price: 180, image: '/images/collar.jpg' },
  { id: 12, name: 'แชมพูขนสุนัข', price: 250, image: '/images/shampoo.jpg' },
  { id: 13, name: 'อาหารสุนัข Hill\'s Science Diet', price: 999, image: '/images/dog3.jpg' },
  { id: 14, name: 'อาหารแมว Royal Canin', price: 899, image: '/images/cat3.jpg' },
  { id: 15, name: 'ของเล่นสุนัข Kong', price: 400, image: '/images/toy2.jpg' },
  { id: 16, name: 'กรงแมวพับได้', price: 1500, image: '/images/catcage.jpg' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="mt-1">
        <BannerCarousel />
      </div>
      <div className="container mx-auto px-4">
        <ProductCarousel title="สินค้าใหม่" products={newProducts} />
        <ProductCarousel title="สินค้าขายดี" products={bestSellers} />
      </div>
    </div>
  );
}
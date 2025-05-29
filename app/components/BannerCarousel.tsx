'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

const BannerCarousel = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{ delay: 3000 }}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
      className="w-full h-[300px] rounded-lg overflow-hidden"
    >
      <SwiperSlide>
        <div className="relative w-full h-[300px]">
          <Image
            src="/images/1.png"
            alt="Banner 1"
            fill
            className="object-cover"
            priority
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[300px]">
          <Image
            src="/images/2.png"
            alt="Banner 2"
            fill
            className="object-cover"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-[300px]">
          <Image
            src="/images/3.png"
            alt="Banner 3"
            fill
            className="object-cover"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default BannerCarousel;

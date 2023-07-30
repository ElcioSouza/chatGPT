import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRef } from "react";

interface CarouselProps {
  children: React.ReactNode[];
}

export function HeroCarousel({ children }: CarouselProps) {
  const swiperRef = useRef(null) as any;

  return (
    <Swiper
      ref={swiperRef}
      spaceBetween={50}
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      pagination={{
        clickable: true,
      }}
      className="hero"
    >
      {children.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
      <div
        className=" !text-primary !w-6 !h-6 !flex rounded-full bg-gray-150 swiper-button-prev hover:opacity-70 transition-opacity"
        id="previousButton"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <GoChevronLeft size={20} />
      </div>
      <div
        className="!text-primary !w-6 !h-6 !flex rounded-full bg-gray-150 swiper-button-next hover:opacity-70 transition-opacity"
        id="nextButton"
        onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <GoChevronRight size={20} />
      </div>
    </Swiper>
  );
}

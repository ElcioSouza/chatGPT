import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

export function Brands() {
  const brands = [
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
    {
      src: "/chamex.png",
    },
  ];

  return (
    <section>
      <h1 className="text-primary text-center border-[3px] text-xl sm:mx-auto mx-5 sm:text-[32px] border-secondary px-8 sm:px-12 py-2 sm:py-4 mb-20 rounded-custom sm:w-fit m-auto">
        Seleção de <b className="text-secondary">marcas</b>
      </h1>
      <div className="flex items-center justify-center mb-8">
        <Swiper
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 5,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="swiper-brands"
        >
          {brands.map((item, index) => (
            <SwiperSlide key={index}>
              <Image
                className="mb-5 w-auto m-auto"
                width={168}
                height={39}
                src={item.src}
                alt="product image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

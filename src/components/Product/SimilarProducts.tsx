import { ProductQuery, useSearchQuery } from "../../../generated/graphql";
import { Swiper, SwiperSlide } from "swiper/react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import Image from "next/image";
import React from "react";
import graphqlRequestClient from "@/lib/graphql.request";
import { toBRL } from "@/utils/toBRL";

interface SimilarProductsProps {
  product: ProductQuery["product"] | undefined;
}

export default function SimilarProducts({ product }: SimilarProductsProps) {
  const { data: products } = useSearchQuery(graphqlRequestClient, {
    input: {
      filter: {
        collectionSlugs: product?.collections.map((item) => item.slug),
      },
      take: 10,
    },
  });

  return (
    <div className="p-5 sm:p-10">
      <p className="ml-6 mb-5 text-gray-350 font-bold text-lg">
        Produtos similares
      </p>
      <div>
        <Swiper
          style={{ paddingLeft: "10px", paddingRight: "20px" }}
          spaceBetween={20}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {products?.searchCustom?.items.map((item) => (
            <SwiperSlide key={item.productId} className="!w-auto cursor-grab">
              <div className="h-[195px] w-[185px] bg-white py-9 items-center shadow-product px-3">
                <Image
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  width={200}
                  height={200}
                  src={item.productPreview || "/no-image.jpg"}
                  alt="product image"
                />
              </div>
              {item.price && (
                <p className="font-bold text-center text-primary my-3">
                  {toBRL.format(item.price / 100)}
                </p>
              )}
              <button className="bg-secondary font-extrabold flex text-xs flex-row rounded-[3px] justify-center items-center text-white gap-1 py-1.5 w-4/5 m-auto hover:opacity-70 transition-opacity">
                <AiOutlineShoppingCart size={18} />
                COMPRAR
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

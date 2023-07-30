import { Swiper, SwiperSlide } from "swiper/react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "../Button";
import Image from "next/image";
import graphqlRequestClient from "@/lib/graphql.request";
import produce from "immer";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useRouter } from "next/router";
import { useSearchQuery } from "../../../generated/graphql";
import { useState } from "react";

export function FilteredProducts() {
  const [filters, setFilters] = useState([
    {
      name: "Em oferta",
      value: "featured",
      isActive: true,
    },
    {
      name: "Em destaque",
      value: "best_seller",
      isActive: false,
    },
    {
      name: "Novidades",
      value: "new",
      isActive: false,
    },
  ]);

  const router = useRouter();

  const { data: products } = useSearchQuery(graphqlRequestClient, {
    input: {
      filter: {
        customFilter: filters.find((item) => item.isActive)?.value as any,
      },
      take: 10,
    },
  });

  const { activeCustomer } = useActiveCustomer();

  function handleClick(index: number) {
    setFilters(
      produce((draft) => {
        draft.forEach((filter, i) => {
          filter.isActive = i === index;
        });
      })
    );
  }

  return (
    <>
      <div className="flex flex-row flex-wrap gap-5 mb-10 justify-around sm:justify-center">
        {filters.map((item, index) => (
          <button
            key={item.name}
            onClick={() => handleClick(index)}
            className={`${
              !item.isActive
                ? "text-primary hover:animate-wiggle transition-opacity bg-[#F3EFEF]"
                : "text-white bg-primary"
            } rounded-3xl padding min-w-[138px] py-2`}
            type="button"
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="w-auto text-black flex items-center justify-center">
        <Swiper
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "20px",
            paddingBottom: "80px",
          }}
          spaceBetween={20}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {products?.searchCustom?.items?.map((item) => (
            <SwiperSlide key={item.productId} className="!w-auto !h-auto">
              <div
                onClick={(ev) => {
                  ev.stopPropagation();
                  router.push(`/produto/${item.productId}`);
                }}
                className="flex cursor-pointer hover:opacity-80 transition-opacity flex-col justify-between mb-2 rounded-lg w-[200px] h-full py-9 items-center shadow-product px-3"
              >
                <Image
                  className="mb-auto object-cover max-w-[100px]"
                  width={126}
                  height={180}
                  src={item.productPreview || "/no-image.jpg"}
                  alt="product image"
                />
                <span className="text-secondary font-bold text-sm line-clamp-2 text-center">
                  {item.productName}
                </span>
                {!activeCustomer?.customFields?.blocked && activeCustomer && (
                  <Button
                    onClick={() => router.push(`/produto/${item.productId}`)}
                    variant="secondary"
                    className="w-full !font-bold !text-xs rounded-md gap-1 mt-5 !py-1.5"
                  >
                    <AiOutlineShoppingCart size={18} />
                    COMPRAR
                  </Button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

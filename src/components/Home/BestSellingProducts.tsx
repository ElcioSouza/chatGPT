import { Swiper, SwiperSlide } from "swiper/react";
import { useProductsQuery, useSearchQuery } from "../../../generated/graphql";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { Button } from "../Button";
import Image from "next/image";
import graphqlRequestClient from "@/lib/graphql.request";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useRouter } from "next/router";

export function BestingSellingProducts() {
  const router = useRouter();

  const { data } = useSearchQuery(graphqlRequestClient, {
    input: {
      filter: {
        customFilter: "new" as any,
      },
      take: 10,
    },
  });

  const { activeCustomer } = useActiveCustomer();

  return (
    <section className="px-5 lg:px-28">
      <h1 className="text-matte-blue font-medium mb-5 text-2xl sm:text-[40px]">
        Mais vendidos
      </h1>
      <div className="flex items-center justify-center">
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
          {data?.searchCustom?.items?.map((item) => (
            <SwiperSlide key={item.productId} className="!w-auto !h-auto">
              <div className="flex flex-col justify-between mb-2 rounded-lg w-[200px] h-full py-9 items-center shadow-product px-3">
                <Image
                  className="mb-auto object-cover max-w-[100px]"
                  width={100}
                  height={100}
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
    </section>
  );
}

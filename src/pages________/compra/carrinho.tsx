import { AiFillTag, AiOutlineShoppingCart } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button } from "@/components/Button";
import { CheckoutLayout } from "@/layouts/checkout";
import Image from "next/image";
import Products from "@/components/Checkout/Products";
import Resume from "@/components/Checkout/Resume";
import graphqlRequestClient from "@/lib/graphql.request";
import { toBRL } from "@/utils/toBRL";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/router";
import { useSearchQuery } from "../../../generated/graphql";

export default function CartDetails() {
  const { activeCustomer } = useActiveCustomer();

  const router = useRouter();

  const { activeOrder, addItem } = useOrder();

  const { data: products } = useSearchQuery(graphqlRequestClient, {
    input: {
      filter: {
        customFilter: "relevant" as any,
      },
      take: 10,
    },
  });

  let isEmptyCart = activeOrder?.lines?.length === 0;

  return (
    <CheckoutLayout step={1}>
      {isEmptyCart ? (
        <>
          <div className="flex items-center justify-center flex-col my-10">
            <h1 className="text-primary font-semibold text-xl sm:text-5xl mb-10">
              Seu carrinho está vazio!
            </h1>
            <p className="font-semibold sm:text-3xl text-[#646468] mb-10">
              Veja nossos produtos em estoque
            </p>
            <Button
              onClick={() => router.push("/")}
              variant="primary"
              className="w-full py-3 max-w-[500px] !font-bold text-xl"
            >
              CONTINUAR COMPRANDO
            </Button>
          </div>
          <div className="py-5 sm:py-10">
            <p className="mb-5 flex flex-row items-center gap-2 text-gray-350 font-bold text-lg">
              <AiFillTag className="text-primary" size={32} /> Produtos que você
              possa gostar
            </p>
            <div className="px-3">
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
                  <SwiperSlide
                    key={item.productId}
                    className="!w-auto cursor-grab"
                  >
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
                    {!activeCustomer?.customFields?.blocked &&
                      activeCustomer && (
                        <button
                          onClick={() =>
                            addItem({
                              productVariantId:
                                item.productId?.toString() as string,
                              quantity: 1,
                            })
                          }
                          className="bg-secondary font-extrabold flex text-xs flex-row rounded-[3px] justify-center items-center text-white gap-1 py-1.5 w-4/5 m-auto hover:opacity-70 transition-opacity"
                        >
                          <AiOutlineShoppingCart size={18} />
                          COMPRAR
                        </button>
                      )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col-reverse sm:flex-row gap-5 my-10">
          <div className="flex flex-col gap-3 w-full">
            <Products />
          </div>
          <div className="flex flex-col sm:max-w-[260px] w-full items-center gap-3">
            <Resume />
            <a className="text-gray-300 font-medium cursor-pointer hover:opacity-70 transition-opacity underline underline-offset-4">
              Solicitar análise de crédito
            </a>
          </div>
        </div>
      )}
    </CheckoutLayout>
  );
}

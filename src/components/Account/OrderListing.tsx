import { FaBoxOpen, FaTruck } from "react-icons/fa";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { BiChevronDown } from "react-icons/bi";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GoCheck } from "react-icons/go";
import Image from "next/image";
import classNames from "classnames";
import moment from "moment";
import { toBRL } from "@/utils/toBRL";
import useActiveCustomer from "@/hooks/useActiveCustomer";

export default function OrderListing() {
  const [selected, setSelected] = useState("");

  const { activeCustomer } = useActiveCustomer();

  return (
    <>
      {activeCustomer?.orders.items.map((item) => {
        const translatedState = {
          AddingItems: "Aberto",
          ArrangingPayment: "Aguardando pagamento",
          PaymentSettled: "Em processamento",
          PaymentAuthorized: "Pagamento aprovado",
          Shipped: "Em rota",
          Delivered: "Entregue",
          Cancelled: "Cancelado",
        }[item.state];

        const orderStatus = [
          {
            icon: (
              <FaBoxOpen
                className={classNames(
                  item.state === "ArrangingPayment" && "text-white opacity-100",
                  "w-full opacity-50"
                )}
                size={28}
              />
            ),
            title: "Pedido recebido",
          },
          {
            icon: (
              <GoCheck
                className={classNames(
                  item.state === "PaymentAuthorized" &&
                    "text-white opacity-100",
                  "w-full opacity-50"
                )}
                size={48}
              />
            ),
            title: "Pedido confirmado",
          },
          {
            icon: (
              <FaTruck
                className={classNames(
                  item.state === "Shipped" && "text-white opacity-100",
                  "w-full opacity-50"
                )}
                size={28}
              />
            ),
            title: "Pedido em trânsito",
          },
          {
            icon: (
              <BsFillCartCheckFill
                className={classNames(
                  item.state === "Delivered" && "text-white opacity-100",
                  "w-full opacity-50"
                )}
                size={32}
              />
            ),
            title: "Pedido entregue",
          },
        ];

        return (
          <div
            key={item.code}
            className="text-gray-300 bg-white p-5 rounded-[16px]"
          >
            <div className="flex flex-row gap-5 justify-between">
              <div className="flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-medium">Número do pedido</span>
                <span className="text-gray-500 font-semibold">{item.code}</span>
              </div>
              <div className="flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-medium">Status do pedido</span>
                <span className="text-gray-500 font-semibold">
                  {translatedState}
                </span>
              </div>
              <div className="hidden sm:flex flex-col gap-1 whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-medium">Tipo de pagamento</span>
                <span className="text-gray-500 font-semibold">
                  {item?.payments && item?.payments.length
                    ? item?.payments[0]?.state
                    : "-"}
                </span>
              </div>
              <div className="hidden sm:flex flex-col gap-1 max-w-[115px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span className="font-medium">Data do pedido</span>
                <span className="text-gray-500 font-semibold">
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
              <a
                onClick={() =>
                  setSelected(selected === item.code ? "" : item.code)
                }
                className="flex flex-row items-center gap-1 cursor-pointer font-semibold text-primary"
              >
                <div className="hidden cursor-pointer hover:opacity-80 transition-opacity sm:flex underline underline-offset-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  Ver detalhes do pedido
                </div>{" "}
                <BiChevronDown size={24} />
              </a>
            </div>
            <div className="bg-gray-100 w-full mt-2 h-[1px]" />
            {item.code === selected && (
              <div className="flex flex-col md:flex-row justify-between p-3">
                <div>
                  <div className="flex flex-col text-gray-300">
                    <h1 className="font-semibold text-primary text-2xl">
                      Endereço
                    </h1>
                    <span>
                      {item.shippingAddress?.streetLine1},{" "}
                      {item.shippingAddress?.customFields?.number} -{" "}
                      {item.shippingAddress?.customFields?.neighborhood},{" "}
                      {item.shippingAddress?.city} -{" "}
                      {item.shippingAddress?.province}
                    </span>
                    <span>
                      CEP{" "}
                      {item.shippingAddress?.postalCode?.replace(
                        /^(\d{5})(\d{3})$/,
                        "$1-$2"
                      )}
                    </span>
                  </div>
                  <div className="hidden sm:flex flex-col text-gray-300 mt-5">
                    <h1 className="font-semibold text-primary text-2xl">
                      Acompanhe seu pedido
                    </h1>
                    <div className="flex items-center w-full mt-5 mb-16 mx-4">
                      <div className="flex items-center">
                        {orderStatus.map((item) => (
                          <>
                            <div className="flex items-center relative">
                              <div className="flex items-center justify-center h-12 w-12 sm:w-16 sm:h-16 bg-primary rounded-full">
                                {item.icon}
                              </div>
                              <div className="absolute top-0 text-center -ml-10 sm:-ml-8 mt-[60px] sm:mt-[70px] w-32 font- text-gray-600">
                                {item.title}
                              </div>
                            </div>
                            <div className="w-16 last:hidden border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-300 mt-5">
                    <h1 className="font-semibold text-primary text-2xl">
                      Produtos
                    </h1>
                    <div className="flex flex-row gap-5 sm:pl-5 pt-10 mr-10 w-fit">
                      <Swiper
                        style={{ paddingLeft: "5px", paddingRight: "5px" }}
                        spaceBetween={20}
                        slidesPerView={"auto"}
                        pagination={{
                          clickable: true,
                        }}
                        className="mySwiper"
                      >
                        {item.lines.map((item) => (
                          <SwiperSlide
                            key={item.productVariant.sku}
                            className="!w-auto"
                          >
                            <div className="max-w-[150px]">
                              <Image
                                src={
                                  item.featuredAsset?.source || "/no-image.jpg"
                                }
                                alt="product image"
                                width={130}
                                height={130}
                              />
                              <p>{item.productVariant.sku}</p>
                              <p className="font-bold line-clamp-2">
                                {item.productVariant.name}
                              </p>
                              <p>Quantidade: {item.quantity}</p>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between sm:items-end">
                  <div className="flex flex-col gap-3 mt-10 w-full sm:w-fit">
                    <div className="flex flex-row justify-between text-gray-500">
                      Subtotal:{" "}
                      <b className="text-primary text-xl">
                        {toBRL.format(item.subTotal / 100)}
                      </b>
                    </div>
                    <div className="h-[1px] w-full bg-gray-100" />
                    <div className="flex flex-row justify-between text-gray-500">
                      Frete:{" "}
                      <b className="text-primary text-xl">
                        {item.shippingWithTax > 0
                          ? toBRL.format(item.shippingWithTax)
                          : "Grátis"}
                      </b>
                    </div>
                    <a className="text-primary cursor-pointer hover:opacity-80 transition-opacity underline font-medium underline-offset-[3px]">
                      Solicitar segunda via do boleto
                    </a>
                  </div>
                  <a className="cursor-pointer whitespace-nowrap hover:opacity-80 transition-opacity text-secondary underline font-medium underline-offset-[3px]">
                    Solicitar cancelamento do pedido
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

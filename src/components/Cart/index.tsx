import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import Image from "next/image";
import { toBRL } from "@/utils/toBRL";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/router";
import { useState } from "react";

type CartProps = {
  open: boolean;
  onClose: (value?: boolean) => void;
};

export function Cart({ onClose }: CartProps) {
  const [value, setValue] = useState(50);

  const router = useRouter();

  const { activeOrder, addItem, adjustItem, removeItem } = useOrder();

  const rangeStyle = {
    background: `linear-gradient(to right, #13158A, #13158A ${value}%, #D9D9D9 ${value}%, #D9D9D9)`,
  };

  return (
    <div className="flex justify-end w-full h-full  z-[999] max-w-screen-xl relative">
      <div className="sm:w-[470px] w-full shadow-product fixed inset-y-0 mt-0 sm:mt-[100px] md:mt-[188px] z-50 overflow-y-auto">
        <div className="flex flex-col bg-gray-cart h-full">
          <div className="flex flex-col overflow-y-auto pt-6 h-full">
            <div className="flex items-start justify-between px-4 sm:px-6">
              <h1 className="text-[38px] font-bold text-primary text-gray-900">
                Meu carrinho
              </h1>
              <div className="ml-3 h-7 flex items-center">
                <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => onClose(false)}
                >
                  <AiOutlineClose
                    className="h-6 w-6 text-[#969393]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
            <div className="mt-8 mb-auto px-4 sm:px-6">
              {activeOrder?.lines.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row items-center gap-5 p-5 bg-white shadow-product rounded-lg w-full"
                >
                  <Image
                    src={item.featuredAsset?.preview ?? "/no-image.jpg"}
                    alt="product image"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-gray-600 font-bold">
                      {item.productVariant.name}
                    </p>
                    <div className="flex flex-col sm:flex-row w-fit sm:items-end mt-1">
                      <div className="flex flex-col w-full mr-5">
                        <span className="text-gray-200 text-sm font-bold line-through decoration-1">
                          R$ 21,90
                        </span>
                        <span className="text-primary text-2xl font-bold">
                          {toBRL.format(item.productVariant.price / 100)}
                        </span>
                      </div>
                      <div
                        style={{
                          boxShadow: "-4px 1px 5px -3px rgba(0, 0, 0, 0.1)",
                        }}
                        className="flex flex-row sm:mt-0 mt-3 rounded-lg bg-gray-50 font-bold gap-3 px-3 py-1"
                      >
                        <AiOutlinePlus
                          onClick={() =>
                            addItem({
                              productVariantId:
                                activeOrder.lines[0].productVariant.id,
                              quantity: 1,
                            })
                          }
                          className="m-auto cursor-pointer"
                        />
                        <div className="border-r border-gray-300" />
                        <div className="flex items-center justify-center">
                          {item.quantity}
                        </div>
                        <div className="border-r border-gray-300" />
                        <AiOutlineMinus
                          onClick={() =>
                            item.quantity === 1
                              ? removeItem(activeOrder.lines[0].id)
                              : adjustItem(
                                  activeOrder.lines[0].id,
                                  item.quantity - 1
                                )
                          }
                          className="m-auto cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(activeOrder?.lines.length === 0 ||
                !activeOrder?.lines.length) && (
                <div className="flex w-full items-center justify-center mt-10">
                  {" "}
                  <Image
                    src="/empty-cart.png"
                    alt="empty cart"
                    width={200}
                    height={200}
                  />
                </div>
              )}
            </div>
            {activeOrder && activeOrder?.lines.length > 0 && (
              <div
                style={{
                  boxShadow: "7px -2px 12px -3px rgba(0, 0, 0, 0.1)",
                }}
                className="flex gap-5 text-gray-400 h-auto flex-col bg-white mt-10 pt-3 px-5"
              >
                <div
                  className="h-2 mt-2 rounded-lg relative"
                  style={rangeStyle}
                ></div>
                <span className="text-gray-400 text-center font-semibold">
                  Pagar com boleto - Faltam mais R$ 100
                </span>
                <div className="flex flex-row w-full justify-between font-semibold">
                  <span>Subtotal:</span>
                  <span>{toBRL.format(activeOrder.totalWithTax / 100)}</span>
                </div>
                <div className="h-[2px] w-full bg-gray-100" />
                <div className="flex flex-row items-center w-full justify-between font-semibold">
                  <span>Frete:</span>
                  <input
                    className="px-3 border-primary border py-2 placeholder:text-gray-100 placeholder:text-xs focus:outline-none"
                    placeholder="Digite seu CEP"
                  />
                </div>
                <button
                  onClick={() => {
                    router.push("/compra/carrinho");
                    onClose(false);
                  }}
                  className="bg-primary text-white py-5 w-full font-bold rounded-xl mb-10"
                >
                  FINALIZAR COMPRA
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

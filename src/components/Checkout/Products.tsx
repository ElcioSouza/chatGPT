import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { FiTrash } from "react-icons/fi";
import Image from "next/image";
import { IoMdTrash } from "react-icons/io";
import React from "react";
import { toBRL } from "@/utils/toBRL";
import useOrder from "@/hooks/useOrder";

export default function Products() {
  const { activeOrder, addItem, adjustItem, removeItem } = useOrder();

  return (
    <>
      {activeOrder?.lines.map((item) => (
        <div
          key={item.id}
          style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
          className="relative sm:grid gap-3 sm:grid-cols-4 flex flex-row flex-wrap justify-center gap-x-5 items-center bg-white rounded-lg p-5"
        >
          <Image
            src={item.featuredAsset?.preview || "/no-image.jpg"}
            alt="product image"
            width={145}
            height={170}
          />
          <div className="flex flex-col">
            <span className="text-[#8F8F93]">Multilaser</span>
            <span className="font-bold text-[#646468] line-clamp-3">
              {item.productVariant.name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>Quant.</span>
            <div
              style={{
                boxShadow: "-4px 1px 5px -3px rgba(0, 0, 0, 0.1)",
              }}
              className="flex flex-row rounded-lg bg-gray-50 font-bold gap-3 px-3 py-1"
            >
              <AiOutlinePlus
                onClick={() =>
                  addItem({
                    productVariantId: activeOrder.lines[0].productVariant.id,
                    quantity: 1,
                  })
                }
                className="m-auto cursor-pointer"
              />
              <div className="border-r border-gray-300" />
              <div>{item.quantity}</div>
              <div className="border-r border-gray-300" />
              <AiOutlineMinus
                onClick={() =>
                  item.quantity === 1
                    ? removeItem(activeOrder.lines[0].id)
                    : adjustItem(activeOrder.lines[0].id, item.quantity - 1)
                }
                className="m-auto cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span>Preço:</span>
            <span className="text-xl font-bold text-primary">
              {toBRL.format(item.productVariant.price / 100)}
            </span>
          </div>{" "}
          <button className="sm:hidden hover:opacity-80 transition-opacity flex absolute top-3 right-3 bg-secondary p-1 rounded-lg text-white">
            <IoMdTrash size={24} />
          </button>
          <div className="hidden sm:flex justify-end sm:col-span-4">
            <button
              onClick={() => removeItem(activeOrder.lines[0].id)}
              className="flex flex-row items-center gap-2 text-secondary"
            >
              <FiTrash size={24} /> Remover produto
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

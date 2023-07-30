import Image from "next/image";
import React from "react";
import { toBRL } from "@/utils/toBRL";
import useOrder from "@/hooks/useOrder";

export default function ProductCard() {
  const { activeOrder } = useOrder();

  return (
    <>
      {activeOrder?.lines.map((item) => (
        <div
          key={item.id}
          style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
          className="w-full sm:w-auto h-auto flex flex-col text-gray-300 max-w-[264px] bg-white rounded-lg p-5"
        >
          <Image
            className="mx-auto mb-5"
            src={item.featuredAsset?.preview || "/no-image.jpg"}
            alt="product image"
            width={120}
            height={120}
          />
          <div className="flex flex-col mb-5">
            <span className="text-[#8F8F93]">Multilaser</span>
            <span className="font-bold text-[#646468]">
              {item.productVariant.name}
            </span>
          </div>
          <span className="mb-1">Quantidade: {item.quantity}</span>
          <span>{toBRL.format(item.productVariant.price / 100)}</span>
        </div>
      ))}
    </>
  );
}

import { FaClipboardList } from "react-icons/fa";
import React from "react";
import { toBRL } from "@/utils/toBRL";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/router";

export default function Resume() {
  const { activeOrder } = useOrder();

  const router = useRouter();

  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col p-5 w-full bg-white text-gray-500  rounded-lg"
    >
      <div className="flex flex-row mb-7 justify-center font-semibold text-primary text-3xl items-center gap-2">
        <FaClipboardList /> Resumo
      </div>
      {activeOrder?.subTotal && (
        <div className="flex flex-row justify-between mb-3">
          <span>Subtotal:</span>
          <span className="font-bold text-xl text-primary">
            {toBRL.format(activeOrder?.subTotal / 100)}
          </span>
        </div>
      )}
      <div className="border-b border-gray-100" />
      <div className="flex flex-row justify-between mt-3">
        <span>Frete:</span>
        <span className="font-bold text-xl text-primary">
          {toBRL.format(activeOrder?.shippingWithTax || 0)}
        </span>
      </div>
      <div className="flex flex-col  justify-between bg-[#faf9f9] px-3 py-4 mt-4">
        {activeOrder?.subTotalWithTax && (
          <div className="flex flex-row justify-between items-center">
            <span>Total à prazo:</span>
            <span className="font-bold text-xl text-primary">
              {toBRL.format(activeOrder?.subTotalWithTax / 100)}
            </span>
          </div>
        )}
        <span className="text-xs">
          Em até <b>5x de R$ 29,90 sem juros.</b>
        </span>
      </div>
      <div className="flex flex-col  justify-between bg-[#faf9f9] px-3 py-4 mt-4">
        {activeOrder?.subTotalWithTax && (
          <div className="flex flex-row justify-between items-center">
            <span>Total à vista:</span>
            <span className="font-bold text-xl text-primary">
              {toBRL.format(activeOrder?.subTotalWithTax / 100)}
            </span>
          </div>
        )}

        <span className="text-xs">
          Em até <b>5x de R$ 29,90 sem juros.</b>
        </span>
      </div>
      <button
        onClick={() => router.push("/compra/verificar")}
        className="w-full bg-primary hover:opacity-80 transition-opacity rounded-xl font-bold text-xl p-3 text-white mt-8"
      >
        COMPRE AGORA
      </button>
    </div>
  );
}

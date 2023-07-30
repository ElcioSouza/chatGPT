import { AiOutlineShoppingCart } from "react-icons/ai";
import OrderListing from "./OrderListing";
import React from "react";
import Select from "../Select";

export default function Orders() {
  const options = [
    {
      value: "aproved",
      title: "Aprovada",
    },
    {
      value: "pendingPayment",
      title: "Aguardando pagamento",
    },
    {
      value: "analising",
      title: "Em análise",
    },
    {
      value: "concluded",
      title: "Concluído",
    },
  ];

  return (
    <>
      <div className="flex flex-row gap-2 mb-5 font-semibold text-2xl text-primary items-center">
        <AiOutlineShoppingCart />
        <h1>Meus pedidos</h1>
      </div>
      <div className="flex flex-row gap-2 items-center mb-5 max-w-[280px]">
        <span className="text-gray-400 font-semibold">Ordenar</span>
        <Select className="h-9 text-sm" name="order" options={options} />
      </div>
      <div className="flex flex-col gap-5 mb-10">
        <OrderListing />
      </div>
    </>
  );
}

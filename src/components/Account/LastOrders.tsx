import { AiOutlineShoppingCart } from "react-icons/ai";
import OrderListing from "./OrderListing";
import React from "react";

export default function LastOrders() {
  return (
    <>
      <div className="flex flex-row gap-2 mb-10 font-semibold text-2xl text-primary items-center">
        <AiOutlineShoppingCart />
        <h1>Últimos pedidos</h1>
      </div>
      <div className="flex flex-col gap-5 mb-10">
        <OrderListing />
      </div>
    </>
  );
}

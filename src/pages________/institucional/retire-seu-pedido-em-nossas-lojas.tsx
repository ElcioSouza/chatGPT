import Image from "next/image";
import React from "react";

export default function PickupOrder() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-lg m-auto px-10 sm:px-20 py-10 my-10 bg-white font-semibold"
    >
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-7 text-center">
        Retire seu pedido em nossas Lojas
      </h1>
      <Image
        className="object-contain h-auto my-0 mx-auto rounded-xl"
        src="/pages/retire-seu-pedido-em-nossas-lojas/retira.jpg"
        alt="payment logo"
        sizes="(max-width: 768px) 50vw, 100vw"
        width={550}
        height={50}
      />
      <p className="text-gray-300 mt-5 text-xl text-center">
        Você também pode fazer um orçamento a qualquer momento através de nosso
        site e nosso comercial entrará em contato.
      </p>
      <p className="text-gray-300 mt-5 text-xl text-center">
        Cesconetto Atacado - O parceiro ideal para repor o seu estoque.
      </p>
    </div>
  );
}

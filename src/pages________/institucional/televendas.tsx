import Image from "next/image";
import React from "react";

export default function Telesales() {
  const consultants = [
    { src: "/pages/televendas/01.png" },
    { src: "/pages/televendas/02.png" },
    { src: "/pages/televendas/03.png" },
    { src: "/pages/televendas/04.png" },
  ];
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-lg m-auto px-10 sm:px-20 py-10 my-10 bg-white font-semibold"
    >
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-5 text-center">
        Televendas
      </h1>
      <p className="text-gray-300 mb-8 font-normal lg:text-justify sm:text-center">
        Possuímos um equipe comercial totalmente voltada para sua empresa seja
        Revenda ou Corporativo. Somos a melhor opção para reposição do seu
        estoque, com um mix variado na Linha de materiais para escritório,
        papelaria, informática, materiais de limpeza e descartáveis. Cadastre
        sua empresa conosco e aproveite as vantagens. Preço competitivo e um
        atendimento de qualidade. Vem pro Cesconetto!
      </p>
      <div className="grid lg:grid-cols-2 gap-10">
        {consultants.map((consultant, i) => (
          <div key={i}>
            <Image
              className="object-contain h-auto my-5 mx-auto rounded-xl"
              src={consultant.src}
              sizes="(max-width: 768px) 50vw, 100vw"
              alt="televendas apresentação"
              height={115}
              width={487}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

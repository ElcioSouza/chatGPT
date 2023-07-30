import React from "react";

export default function WorkWithUs() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-md m-auto px-10 sm:px-20 py-10 my-10 bg-white font-semibold"
    >
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-5 text-center">
        Trabalhe conosco
      </h1>
      <p className="bg-secondary w-fit m-auto px-5 py-2 rounded-xl text-white mb-4 text-2xl text-center">
        Faça parte da Família Cesconetto !
      </p>
      <p className="text-gray-300 mb-2 font-normal text-center">
        Envie seu currículo e entraremos em contato assim que necessário. Envie
        seu email para: D
        <a href="mailto:dp01@cesconetto.com.br">dp01@cesconetto.com.br</a>{" "}
        <br /> Telefone: <a href="tel:+550152721042136">(27) 2104-2136.</a>
      </p>
    </div>
  );
}

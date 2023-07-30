import Image from "next/image";
import React from "react";

export default function AboutUs() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-lg m-auto my-10 bg-white "
    >
      <div className="flex flex-col h-auto w-auto relative">
        <div className="px-10 sm:px-20 py-5">
          <h1 className="text-primary text-2xl font-semibold text-center sm:text-4xl mb-3">
            Sobre nós
          </h1>
        </div>
        <div className="flex flex-col text-[#6A6A6A] font-medium gap-5 max-w-lg mx-10 w-auto">
          <p>
            Nossa história começa no início da década de 80 com a família de
            origem de descendentes italianos – a Família Cesconetto, que possui
            o comércio no sangue e que naturalmente buscou os caminhos do
            empreendedorismo ao se estabelecer na Grande Vitória.
          </p>
          <p>
            No mercado atacadista iniciou-se em um galpão de 300m2, no Município
            de Cariacica e nos anos seguintes a empresa é melhor estruturada em
            uma loja própria, em Jardim América.
          </p>
          <p>
            {" "}
            Com a expansão das atividades a mesma adquire um imóvel em Carapina
            na Serra com uma área de 12 mil m2, que passou a ser a Matriz do
            negócio e um grande Centro de Distribuição no Espírito Santo.
          </p>
        </div>
        <div className="mx-10 mt-10 mb-20">
          <Image
            className="w-auto m-auto h-auto"
            src="/hero-banner.png"
            alt="hero banner"
            width={500}
            height={500}
          />
        </div>

        <div className="absolute flex flex-col max-w-[80px] md:max-w-[250px] sm:max-w-[150px] w-full mb-1.5 top-[30px] mr-3">
          <div className="cuttedTopLeft mr-3 mb-1 bg-primary" />
          <div className="cuttedBottomLeft ml-3 bg-secondary" />
        </div>
        <div className="absolute flex flex-col max-w-[80px] md:max-w-[250px] sm:max-w-[150px] right-0 bottom-[30px] w-full">
          <div className="cuttedTopRight bg-primary ml-3 mb-1" />
          <div className="cuttedBottomRight bg-secondary mr-3" />
        </div>
      </div>
    </div>
  );
}

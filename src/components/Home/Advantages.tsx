import Image from "next/image";
import React from "react";

export default function Advantages() {
  return (
    <>
      <h1 className="mx-auto mb-20 gradient-underline text-2xl sm:text-4xl text-primary w-fit">
        Vantagens <b className="text-secondary">para você</b>
      </h1>
      <div className="flex flex-col items-center justify-center px-5 sm:grid grid-cols-1 sm:grid-cols-2 place-items-center w-full m-auto gap-5 pb-20">
        <Image
          className="cursor-pointer hover:opacity-80 transition-opacity h-auto w-auto"
          width={559}
          height={378}
          src="/advantage.png"
          alt="product image"
        />
        <Image
          className="cursor-pointer hover:opacity-80 transition-opacity h-auto w-auto"
          width={559}
          height={378}
          src="/advantage.png"
          alt="product image"
        />
        <Image
          className="cursor-pointer hover:opacity-80 transition-opacity h-auto w-auto"
          width={559}
          height={378}
          src="/advantage.png"
          alt="product image"
        />
        <Image
          className="cursor-pointer hover:opacity-80 transition-opacity h-auto w-auto"
          width={559}
          height={378}
          src="/advantage.png"
          alt="product image"
        />
      </div>
    </>
  );
}

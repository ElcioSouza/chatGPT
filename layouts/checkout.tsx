import { Fragment, ReactNode } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import { Button } from "@/components/Button";

interface CheckoutLayout {
  children: ReactNode;
  step: number;
}

export function CheckoutLayout({ children, step }: CheckoutLayout) {
  const steps = [
    "Carrinho",
    "Verificar pedido",
    "Pagamento",
    "Pedido completo",
  ];

  return (
    <div className="max-w-screen-lg m-auto px-5">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-5 mt-5 sm:justify-start sm:gap-0 gap-3 justify-center flex sm:flex-row flex-col text-primary items-center rounded-lg"
      >
        {step === 1 ? (
          <>
            <div className="flex flex-row items-center">
              <AiOutlineShoppingCart className="sm:w-12 sm:h-12 h-9 w-9" />{" "}
              <span className="font-semibold text-xl sm:text-2xl md:text-4xl ml-3 sm:mb-0">
                Meu carrinho
              </span>
            </div>
            <Button
              variant="secondary"
              className="sm:ml-auto  text-white !font-bold sm:text-xl !text-base"
            >
              REMOVER TODOS OS PRODUTOS
            </Button>
          </>
        ) : (
          <span className="font-semibold text-2xl sm:text-4xl flex justify-center w-full">
            Checkout
          </span>
        )}
      </div>
      <div className="sm:flex hidden text-xl md:text-2xl flex-row items-center font-semibold gap-1 justify-center text-gray-200 mt-10">
        {steps.map((item, index) => (
          <Fragment key={item}>
            <span
              key={item}
              className={step === index + 1 ? "text-gray-600" : "text-gray-200"}
            >
              {item}
            </span>
            <BsArrowRightShort className="last:hidden" size={24} />
          </Fragment>
        ))}
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

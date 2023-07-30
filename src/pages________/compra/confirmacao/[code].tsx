import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "@/components/Button";
import { CheckoutLayout } from "@/layouts/checkout";
import React from "react";
import { useRouter } from "next/router";

export default function Confirmation() {
  const router = useRouter();

  const { code } = router.query;

  return (
    <CheckoutLayout step={4}>
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-5 sm:p-10 rounded-3xl w-full my-10"
      >
        <div className="flex w-full items-center justify-center gap-2 text-primary text-xl sm:text-4xl font-semibold">
          <BsFillCheckCircleFill size={32} /> Pedido recebido!
        </div>
        <div className="max-w-xl mx-auto mt-8">
          <div className="flex flex-col text-center">
            <span className="text-base sm:text-xl text-gray-200">
              Recebemos seu pedido N° {code} agora é só realizar o pagamento!
              Você fazer o dowload do boleto bancário através do link abaixo:
            </span>
            <div className="m-auto mt-8">
              <Button
                className="w-full py-3 sm:text-xl !font-bold !rounded-xl"
                variant="primary"
              >
                VISUALIZAR BOLETO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}

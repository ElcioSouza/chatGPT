import { BsFillCheckCircleFill } from "react-icons/bs";
import { Button } from "@/components/Button";
import React from "react";
import { useRouter } from "next/router";

export default function SuccessAnalysis() {
  const router = useRouter();

  return (
    <div className="max-w-screen-lg m-auto px-5">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-5 mt-5 flex flex-row text-primary items-center rounded-lg"
      >
        <span className="font-semibold text-center sm:text-4xl text-xl flex justify-center w-full">
          Solicitação de análise de crédito{" "}
        </span>
      </div>
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="w-fit m-auto flex flex-col bg-white rounded-2xl my-10 px-5 py-5 sm:px-10 sm:py-10"
      >
        <div className="flex sm:flex-row flex-col items-center sm:items-end justify-center gap-2 text-primary text-2xl md:text-4xl sm:text-3xl font-semibold">
          <BsFillCheckCircleFill className="sm:w-9 sm:h-9 w-8 h-8" />
          <span className="text-center">Solicitação em análise!</span>
        </div>
        <div className="mt-8">
          <div className="flex flex-col text-center ">
            <span className=" md:text-xl lg:text-lg text-gray-200 max-w-[500px]">
              Recebemos sua solicitação de crédito! Em até 3 dias úteis você
              receberá um e-mail com as atualizações referente ao seu pedido.
            </span>
            <div className="mt-8 w-full m-auto max-w-[500px]">
              <Button
                onClick={() => router.push("/")}
                className="w-full py-3 !font-bold !rounded-xl"
                variant="primary"
              >
                CONTINUAR COMPRANDO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

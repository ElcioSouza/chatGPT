import { Button } from "../Button";
import Modal from "../Modal";
import React from "react";

interface CreditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function CreditModal({ isOpen, setIsOpen }: CreditModalProps) {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex justify-center text-primary font-semibold text-3xl pb-5">
        <h1>Atenção!</h1>
      </div>
      <div className="max-w-sm m-auto">
        <p className="text-center leading-relaxed text-gray-600">
          Seu pedido está em análise pois ultrapassou o seu limite atual de
          crédito para faturamento.
        </p>
      </div>
      <div className="flex flex-col gap-3 items-center max-w-sm m-auto py-6 border-gray-200 rounded-b">
        <Button className="w-full py-3" variant="primary">
          SOLICITAR UM AUMENTO DE LIMITE
        </Button>
        <Button className="w-full py-3" variant="primary">
          PAGAR À VISTA
        </Button>
      </div>
    </Modal>
  );
}

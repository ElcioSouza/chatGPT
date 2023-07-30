import React, { useState } from "react";

import { AiOutlineExclamationCircle } from "react-icons/ai";
import { Button } from "../Button";
import Input from "../Input";
import Link from "next/link";
import Modal from "../Modal";

interface RegisterModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function RecoveryPasswordModal({
  isOpen,
  setIsOpen,
}: RegisterModalProps) {
  const [step, setStep] = useState(1);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex justify-center text-primary font-semibold text-3xl pb-5">
        <h1 className="text-center">Esqueceu sua senha de acesso?</h1>
      </div>
      <div className="max-w-sm m-auto text-center">
        {step === 1 && (
          <div className="flex flex-row items-center justify-center mb-5 gap-2 text-sm text-primary">
            <AiOutlineExclamationCircle size={24} /> Informe o CNPJ cadastrado
          </div>
        )}

        {step === 1 ? (
          <Input name="cnpj" placeholder="Digite o CNPJ aqui" />
        ) : (
          <>
            Para cadastrar uma nova senha enviremos um link de recuperação para
            o e-mail{" "}
            <b className="text-primary underline underline-offset-2">
              gabriell****@gmail.com
            </b>{" "}
            cadastrado.
          </>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center max-w-sm m-auto py-6 border-gray-200 rounded-b">
        <Button
          onClick={() => (step === 2 ? setIsOpen(false) : setStep(2))}
          className="w-full py-3"
          variant="primary"
        >
          {step === 1 ? "ENVIAR" : "OK"}
        </Button>
      </div>
      {step === 2 && (
        <p className="text-sm text-primary font-light text-center">
          Caso não tenha mais acesso a este e-mail, favor entrar em contato com
          o{" "}
          <Link
            href="#"
            className="font-bold underline hover:opacity-80 transition-opacity underline-offset-2"
          >
            atendimento Cesconetto.
          </Link>
        </p>
      )}
    </Modal>
  );
}

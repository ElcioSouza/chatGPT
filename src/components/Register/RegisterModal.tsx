import { Button } from "../Button";
import Link from "next/link";
import Modal from "../Modal";
import React from "react";
import { useRouter } from "next/router";

interface RegisterModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  registerStatus: string;
  name: string;
}

export default function RegisterModal({
  isOpen,
  registerStatus,
  setIsOpen,
  name,
}: RegisterModalProps) {
  const router = useRouter();

  const modalData = {
    approved: {
      title: "Recebemos seu cadastro!",
      content: (
        <p className="text-center leading-relaxed text-gray-600">
          {name}, seu cadastro está em análise! Em até 3 dias úteis você
          receberá um e-mail com as informações atualizadas sobre seu cadastro.
        </p>
      ),
    },
    "no-coverage": {
      title: "Comunicado!",
      content: (
        <p className="text-center leading-relaxed text-gray-600">
          Pedimos desculpas! Ainda não atendemos na região que você selecionou
          mas em breve estaremos aí!
        </p>
      ),
    },
    "not-approved": {
      title: "Comunicado!",
      content: (
        <p className="text-center leading-relaxed text-gray-600">
          Seu cadastro não foi aprovado. Favor entrar em contato através do{" "}
          <b>telefone 27 333-4345</b>
        </p>
      ),
    },
  }[registerStatus];

  return (
    <Modal
      onClose={() => {
        if (registerStatus === "approved") {
          router.push("/entrar");
        }
      }}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex justify-center text-primary font-semibold text-3xl pb-5">
        <h1 className="text-center">{modalData?.title}</h1>
      </div>
      <div className="max-w-sm m-auto">{modalData?.content}</div>
      <div className="flex flex-col gap-3 items-center max-w-sm m-auto py-6 border-gray-200 rounded-b">
        <Button
          onClick={() => {
            if (registerStatus === "approved") {
              router.push("/entrar");
            } else {
              setIsOpen(false);
            }
          }}
          className="w-full py-3"
          variant="primary"
        >
          OK
        </Button>
      </div>
      {registerStatus === "approved" && (
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
      {registerStatus === "no-coverage" && (
        <div className="flex flex-row items-center gap-2 justify-center mb-5">
          <input type="checkbox" checked />
          <span className="ml-2 text-sm text-gray-200 mt-1.5">
            Me notifique por e-mail quando a Cesconetto estiver nessa região.
          </span>
        </div>
      )}
    </Modal>
  );
}

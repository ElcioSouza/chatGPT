import { Button } from "./Button";
import { FaSpinner } from "react-icons/fa";
import { GoCheck } from "react-icons/go";
import Link from "next/link";
import Modal from "./Modal";
import React from "react";
import graphqlRequestClient from "@/lib/graphql.request";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../generated/graphql";

interface TermsModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function TermsModal({ isOpen, setIsOpen }: TermsModalProps) {
  const { register, watch, handleSubmit } = useForm();

  const { activeCustomer } = useActiveCustomer();

  const { mutate, isLoading } = useUpdateUserMutation(graphqlRequestClient);

  const submitAcceptedTerms = () => {
    mutate(
      {
        input: {
          customFields: {
            acceptterms: true,
          },
        },
      },
      {
        onSuccess(data) {
          if (data.updateCustomer.id) {
            setIsOpen(false);
          }
        },
      }
    );
  };

  return (
    <Modal
      title="Políticas de privacidade"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit(submitAcceptedTerms)} className="pt-5 px-5">
        <p className="text-center">
          Olá,{" "}
          <b className="text-primary text-lg">{activeCustomer?.firstName}</b>!
        </p>
        <div className="flex flex-col gap-3 my-5">
          <p>
            Agradecemos por utilizar a nossa plataforma! No entanto, observamos
            que você ainda não aceitou nossas políticas da empresa e políticas
            de privacidade.
          </p>
          <p>
            É essencial que você leia e concorde com nossas políticas para
            garantir a transparência e proteção dos seus dados pessoais. Estamos
            empenhados em fornecer um ambiente seguro e confiável para todos os
            nossos usuários.
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <input {...register("checkPrivacyPolicies")} type="checkbox" />
          <span className="ml-2 text-sm text-gray-200 mt-1.5">
            Li e estou de acordo com as{" "}
            <Link
              href="/institucional/politica-de-privacidade"
              target="_blank"
              className="text-primary hover:opacity-80 transition-opacity cursor-pointer font-bold underline-offset-2 underline"
            >
              políticas da empresa e políticas de privacidade.*
            </Link>
          </span>
        </div>
        <div className="flex items-end justify-end mt-5">
          <Button
            disabled={!watch("checkPrivacyPolicies")}
            className="!px-2"
            variant="primary"
          >
            {isLoading ? <FaSpinner className="animate-spin" /> : <GoCheck />}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

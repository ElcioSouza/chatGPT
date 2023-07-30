import * as yup from "yup";

import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import graphqlRequestClient from "@/lib/graphql.request";
import { toast } from "react-toastify";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useCreateCreditAnalysisMutation } from "../../../../generated/graphql";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const refSchema = yup.object().shape({
  references: yup.array().of(
    yup.object().shape({
      reference: yup.string(),
    })
  ),
});

const dataSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  phoneNumber: yup.string().required("Campo obrigatório"),
  company: yup.string(),
});

export default function Analysis() {
  const [step, setStep] = useState(1);

  const {
    handleSubmit: handleSubmitData,
    watch: watchData,
    register: registerData,
    formState: { errors: errorsData },
  } = useForm({
    resolver: yupResolver(dataSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      company: "",
    },
  });

  const {
    handleSubmit: handleSubmitRef,
    control: controlRef,
    register: registerRef,
  } = useForm({
    resolver: yupResolver(refSchema),
    defaultValues: {
      references: [
        { reference: "" },
        { reference: "" },
        { reference: "" },
        { reference: "" },
        { reference: "" },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: controlRef,
    name: "references",
  });

  const router = useRouter();

  const { activeCustomer } = useActiveCustomer();

  const { mutate } = useCreateCreditAnalysisMutation(graphqlRequestClient);

  const nextStep = () => {
    setStep(2);
  };

  const requestAnalysis = (values: { references: { reference: string }[] }) => {
    mutate(
      {
        data: {
          name: watchData("name"),
          phoneNumber: watchData("phoneNumber"),
          email: activeCustomer?.emailAddress || "",
          references: values.references,
        },
      },
      {
        onSuccess(data) {
          if (data.createCreditAnalysis?.success) {
            router.push("/credito/analise/sucesso");
          } else {
            toast.error(data.createCreditAnalysis?.message);
          }
        },
        onError() {
          toast.error(
            "Não foi possível solicitar a análise de crédito, tente novamente!"
          );
        },
      }
    );
  };

  return (
    <div className="max-w-screen-lg m-auto px-5">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white p-5 mt-5 flex flex-row text-primary items-center rounded-lg"
      >
        <span className="font-semibold sm:text-4xl text-center text-xl flex justify-center w-full">
          Solicitação de análise de crédito{" "}
        </span>
      </div>
      <div className="w-full bg-white rounded-2xl my-10 px-5 sm:px-20 py-10">
        {step === 1 ? (
          <form onSubmit={handleSubmitData(nextStep)}>
            <p className="text-sm text-gray-400 pb-3 pl-2">1. Dados pessoais</p>
            <div className="flex flex-col gap-6">
              <Input
                placeholder="Nome completo"
                register={registerData}
                name="name"
                error={errorsData.name}
              />
              <Input
                placeholder="Telefone"
                register={registerData}
                name="phoneNumber"
                error={errorsData.phoneNumber}
              />
              <Input
                placeholder="Empresa"
                register={registerData}
                name="company"
              />
            </div>

            <Button
              className="rounded-[11px] py-3 m-auto max-w-[500px] w-full mt-10 font-bold"
              variant="primary"
            >
              SOLICITAR ANÁLISE
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitRef(requestAnalysis)}>
            <p className="text-sm text-gray-400 pb-3 pl-2">
              2. Cite 05 referências empresariais
            </p>
            <div className="flex flex-col gap-6">
              {fields.map((field, index) => (
                <Input
                  key={field.id}
                  name={`references.${index}.reference`}
                  register={registerRef}
                  placeholder={`Referência ${index + 1}`}
                />
              ))}
            </div>
            <Button
              className="rounded-[11px] py-3 m-auto max-w-[500px] w-full mt-10 h-14 font-bold text-xl"
              variant="primary"
            >
              SOLICITAR ANÁLISE
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

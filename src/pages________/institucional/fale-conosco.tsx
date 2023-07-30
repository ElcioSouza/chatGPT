import { Button } from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const { register, handleSubmit } = useForm();

  const paymentOptions = [
    {
      value: "credit",
      title: "Cartão de crédito",
    },
    {
      value: "bankslip",
      title: "Boleto Bancário",
    },
  ];

  const requestReturn = () => {};

  return (
    <div className="max-w-[840px] m-auto p-5">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="w-auto flex flex-col bg-white py-10 text-primary items-center rounded-lg"
      >
        <span className="font-semibold sm:text-4xl text-xl mb-10">
          Fale Conosco
        </span>
        <form
          onSubmit={handleSubmit(requestReturn)}
          className="w-full bg-white rounded-2xl px-8 sm:px-14"
        >
          <div className="flex flex-col gap-6">
            <Input
              placeholder="Nome completo*"
              register={register}
              name="name"
            />
            <Input placeholder="Email*" register={register} name="email" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Telefone*"
                register={register}
                name="phoneNumber"
              />
              <Input placeholder="CNPJ" register={register} name="document" />
            </div>
            <div className="sm:w-[calc(50%-8px)] w-full">
              <Select
                className="h-14"
                name="type"
                register={register}
                options={paymentOptions}
              />
            </div>
            <TextArea
              className="!h-[190px]"
              placeholder="Mensagem"
              register={register}
              name="motive"
            />
          </div>
          <p className="text-gray-200 text-end mt-2 text-sm">
            (*) Campos obrigatórios
          </p>
          <Button
            className="rounded-[11px] py-3 m-auto max-w-[500px] w-full mt-10 h-14 font-bold text-xl"
            variant="primary"
          >
            ENVIAR
          </Button>
        </form>
        <div className="px-10">
          <div className="w-full h-[1px] bg-gray-100 my-10 px-10" />
          <p className="mb-2 text-gray-300">
            Você pode também fazer suas compras através da nossa Central de
            Televendas. Clique aqui. Dúvidas? contate-nos via Fale Conosco, ou
            se preferir, entre em contato no telefone (27) 2104-2104.
          </p>
          <p className="text-gray-300">
            Você também pode fazer um orçamento a qualquer momento através de
            nosso site e nosso comercial entrará em contato.
          </p>
        </div>
      </div>
    </div>
  );
}

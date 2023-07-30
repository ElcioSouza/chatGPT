import { AiOutlinePicture } from "react-icons/ai";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import React from "react";
import TextArea from "@/components/TextArea";
import { useForm } from "react-hook-form";

export default function Returns() {
  const { register, handleSubmit, watch } = useForm();

  const requestReturn = () => {};

  return (
    <div className="max-w-[840px] m-auto p-5">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="w-auto flex flex-col bg-white py-10 text-primary items-center rounded-lg"
      >
        <span className="font-semibold sm:text-4xl text-xl mb-10">
          Devolução de mercadoria
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
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <div className="flex flex-row items-center gap-3">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-200 text-sm">
                  Tenho Inscrição estadual
                </span>
              </div>
              <div className="flex flex-row items-center gap-3">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-200 text-sm">
                  Não tenho Inscrição estadual
                </span>
              </div>
            </div>
            <Input placeholder="Email*" register={register} name="email" />
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Telefone*"
                register={register}
                name="phoneNumber"
              />
              <Input placeholder="CNPJ" register={register} name="document" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <Input
                  placeholder="Número do pedido"
                  register={register}
                  name="orderNumber"
                />
              </div>
              <label className="w-full cursor-pointer hover:opacity-80 transition-opacity">
                <input {...register("note")} type="file" hidden />
                <div className="w-full flex items-center h-14 border focus:outline-none text-gray-200 border-primary rounded-lg pl-3 pr-5">
                  {watch("note")?.[0]?.name || "Anexo nota fiscal"}
                  <AiOutlinePicture
                    size={28}
                    className="text-primary ml-auto"
                  />
                </div>
              </label>
            </div>
            <TextArea
              className="!h-[190px]"
              placeholder="Motivo da devolução"
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

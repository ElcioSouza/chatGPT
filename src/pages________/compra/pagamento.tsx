import { Button } from "@/components/Button";
import { CheckoutLayout } from "@/layouts/checkout";
import Input from "@/components/Input";
import React from "react";
import Select from "@/components/Select";
import { useForm } from "react-hook-form";

export default function Payment() {
  const { register, watch } = useForm({
    defaultValues: {
      type: "credit",
    },
  });

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

  const installments = [
    {
      value: "1",
      title: "1x Sem juros - R$ 29,90",
    },
    {
      value: "2",
      title: "2x Sem juros - R$ 29,90",
    },
    {
      value: "3",
      title: "3x Sem juros - R$ 29,90",
    },
  ];

  return (
    <CheckoutLayout step={3}>
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white px-3 py-10 sm:p-10 rounded-3xl w-full my-10"
      >
        <h1 className="text-center text-primary text-xl sm:text-4xl font-semibold">
          Selecione a forma de pagamento
        </h1>
        <div className="max-w-[80%] m-auto mt-10">
          <Select name="type" register={register} options={paymentOptions} />
          <div className="mt-10">
            {watch("type") === "credit" && (
              <>
                <div className="flex flex-col gap-5">
                  <Input
                    name="name"
                    register={register}
                    placeholder="Nome impresso no cartão"
                  />
                  <Input
                    name="number"
                    register={register}
                    placeholder="Número do cartão"
                  />

                  <div className="flex flex-col sm:flex-row gap-5">
                    <Input
                      name="expiry"
                      register={register}
                      placeholder="Validade"
                    />
                    <Input name="cvv" register={register} placeholder="CVV" />
                    <Input
                      name="birth"
                      register={register}
                      placeholder="Data de nascimento"
                    />
                  </div>
                  <Input
                    name="cpf"
                    register={register}
                    placeholder="CPF do titular"
                  />
                  <Select
                    className="h-14"
                    name="installments"
                    register={register}
                    options={installments}
                  />
                </div>
                <div className="m-auto max-w-sm mt-10">
                  <Button
                    className="w-full sm:text-xl py-3 !font-bold !rounded-xl"
                    variant="primary"
                  >
                    PAGAR COM CARTÃO
                  </Button>
                </div>
              </>
            )}
            {watch("type") === "bankslip" && (
              <div className="flex flex-col text-center">
                <span className="text-sm sm:font-medium text-gray-200">
                  O prazo de validade do seu boleto é de até 3 dias úteis, você
                  pode imprimir e pagar no banco ou utilizar o código que será
                  enviado para o email cadastrado para pagar pela internet. Após
                  o pagamento, o status do seu pedido será atualizado também em
                  até 3 dias úteis (o tempo de atualização pode ser maior
                  durante feriados).
                </span>
                <div className="m-auto max-w-md mt-10">
                  <Button
                    className="w-full py-3 sm:text-xl !font-bold !rounded-xl"
                    variant="primary"
                  >
                    PAGAR COM BOLETO
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
}

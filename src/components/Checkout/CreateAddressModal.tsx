import * as yup from "yup";

import React, { useEffect } from "react";
import {
  useCreateCustomerAddressMutation,
  useGetIbgeCodeByCepQuery,
  useUpdateUserMutation,
} from "../../../generated/graphql";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import graphqlRequestClient from "@/lib/graphql.request";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const createAddressSchema = yup.object().shape({
  cep: yup.string().required("Campo obrigatório"),
  streetLine1: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
  city: yup.string().required("Campo obrigatório"),
  customFields: yup.object().shape({
    neighborhood: yup.string().required("Campo obrigatório"),
    number: yup.string().required("Campo obrigatório"),
  }),
});

export default function CreateAddressModal({
  isOpen,
  setIsOpen,
}: CreditModalProps) {
  const {
    handleSubmit,
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAddressSchema),
    defaultValues: {
      streetLine1: "",
      cep: "",
      state: "",
      city: "",
      customFields: {
        neighborhood: "",
        number: "",
      },
    },
  });

  const { refechActiveCustomer } = useActiveCustomer();

  const { mutate: updateUser, isLoading } =
    useUpdateUserMutation(graphqlRequestClient);

  const { mutate: createCustomerAddress } =
    useCreateCustomerAddressMutation(graphqlRequestClient);

  const createAddress = (values: any) => {
    createCustomerAddress(
      {
        input: {
          countryCode: "BR",
          postalCode: watch("cep"),
          customFields: { ...values.customFields },
          province: values.state,
          city: values.city,
          streetLine1: values.streetLine1,
          defaultBillingAddress: true,
          defaultShippingAddress: true,
        },
      },
      {
        onSuccess(data) {
          if (data.createCustomerAddress.__typename === "Address") {
            refechActiveCustomer();
            setIsOpen(false);
          }
        },
      }
    );
  };

  const { data: address } = useGetIbgeCodeByCepQuery(
    graphqlRequestClient,
    {
      cep: watch("cep"),
    },
    {
      enabled: watch("cep")?.length === 9,
    }
  );

  useEffect(() => {
    if (address && address.getIbgeCodeByCep.__typename === "IbgeCodeByCep") {
      setValue("streetLine1", address.getIbgeCodeByCep.street);
      setValue(
        "customFields.neighborhood",
        address.getIbgeCodeByCep.neighborhood
      );
      setValue("state", address.getIbgeCodeByCep.state);
      setValue("city", address.getIbgeCodeByCep.city);
    }
  }, [address]);

  return (
    <Modal title="Criar novo endereço" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(createAddress)}>
        <div className="p-5">
          <div className="flex flex-col m-auto gap-5 w-full">
            <div className="mb-5">
              <Input
                mask="99999-999"
                control={control}
                name="cep"
                placeholder="CEP"
                error={errors.cep}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Input
                register={register}
                placeholder="Rua"
                name="streetLine1"
                error={errors.streetLine1}
              />
              <Input
                register={register}
                placeholder="Número"
                name="customFields.number"
                error={errors.customFields?.number}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Input
                register={register}
                placeholder="Bairro"
                name="customFields.neighborhood"
                error={errors.customFields?.neighborhood}
              />
              <Input
                register={register}
                placeholder="Cidade"
                name="city"
                error={errors.city}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 px-5 items-center border-gray-200 rounded-b">
          {/* <Button
            onClick={() => setIsOpen(false)}
            type="button"
            className="w-full py-3"
            variant="primary"
          >
            CANCELAR
          </Button> */}
          <Button className="w-full py-3 my-5 gap-2" variant="primary">
            {isLoading && (
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            )}
            CONFIRMAR
          </Button>
        </div>
      </form>
    </Modal>
  );
}

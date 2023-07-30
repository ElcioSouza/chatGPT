import {
  useUpdateCustomerAddressMutation,
  useUpdateUserMutation,
} from "../../../generated/graphql";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button";
import Modal from "../Modal";
import React from "react";
import graphqlRequestClient from "@/lib/graphql.request";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useForm } from "react-hook-form";

interface CreditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function ChangeAddressModal({
  isOpen,
  setIsOpen,
}: CreditModalProps) {
  const { handleSubmit, register, watch } = useForm();

  const { activeCustomer } = useActiveCustomer();

  const { mutate: updateCustomerAddress } =
    useUpdateCustomerAddressMutation(graphqlRequestClient);

  const changeAddress = (values: any) => {
    //    updateCustomerAddress({
    //      input: { ...values },
    //    });
  };

  const { isLoading } = useUpdateUserMutation(graphqlRequestClient);

  return (
    <Modal
      title="Alterar endereço padrão"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit(changeAddress)}>
        <div className="flex flex-col gap-3 p-5">
          {activeCustomer?.addresses?.map((item) => (
            <div key={item.id} className="flex flex-row items-center gap-3">
              <input
                {...register("defaultShippingAddress")}
                id={item.id}
                type="radio"
                defaultChecked={
                  !!activeCustomer?.addresses?.find(
                    (address) => address.id === item.id
                  )?.id
                }
                value={item.id}
                className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
              />
              {item.streetLine1}, {item.customFields?.number} -{" "}
              {item.customFields?.neighborhood} {item.city}, {item.province}
              <br />
              {item.postalCode}
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-3 px-5 items-center border-gray-200 rounded-b">
          <Button className="w-full py-3 mt-5 gap-2" variant="primary">
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

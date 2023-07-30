import { AiOutlinePlusCircle, AiOutlinePoweroff } from "react-icons/ai";
import React, { useState } from "react";

import ChangeAddressModal from "@/components/Checkout/ChangeAddressModal";
import { CheckoutLayout } from "@/layouts/checkout";
import CreateAddressModal from "@/components/Checkout/CreateAddressModal";
import CreditModal from "@/components/Checkout/CreditModal";
import { FaExchangeAlt } from "react-icons/fa";
import Image from "next/image";
import ProductCard from "@/components/Checkout/ProductCard";
import Resume from "@/components/Checkout/Resume";
import useActiveCustomer from "@/hooks/useActiveCustomer";

export default function CheckOrder() {
  const [isOpenCreditModal, setIsOpenCreditModal] = useState(false);

  const [isOpenCreateAddressModal, setIsOpenCreateAddressModal] =
    useState(false);

  const [isOpenChangeAddressModal, setIsOpenChangeAddressModal] =
    useState(false);

  const { activeCustomer } = useActiveCustomer();

  const defaultAddress = activeCustomer?.addresses?.find(
    (item) => !!item.defaultShippingAddress
  );

  return (
    <>
      {isOpenCreditModal && (
        <CreditModal
          isOpen={isOpenCreditModal}
          setIsOpen={setIsOpenCreditModal}
        />
      )}
      {isOpenCreateAddressModal && (
        <CreateAddressModal
          isOpen={isOpenCreateAddressModal}
          setIsOpen={setIsOpenCreateAddressModal}
        />
      )}
      {isOpenChangeAddressModal && (
        <ChangeAddressModal
          isOpen={isOpenChangeAddressModal}
          setIsOpen={setIsOpenChangeAddressModal}
        />
      )}
      <CheckoutLayout step={2}>
        <div className="flex flex-col sm:flex-row gap-3 mt-9">
          <div className="w-full h-auto text-gray-300 flex flex-col sm:flex-row items-center sm:text-start text-center bg-white gap-5 py-5 px-6 rounded-2xl">
            <Image
              className="w-24 h-24 rounded-full"
              src="/profile.jpg"
              alt="profile image"
              width={100}
              height={100}
            />
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-row justify-between">
                <p className="text-primary font-semibold text-2xl">
                  Bem vinda, {activeCustomer?.firstName}!
                </p>
                <AiOutlinePoweroff className="text-secondary" />
              </div>

              <p>{activeCustomer?.emailAddress}</p>
              <div className="flex flex-row gap-3 items-center">
                <span>Globalsys</span>
                <div className="w-[1px] h-full bg-[#D9D8D8]" />
                <span>{activeCustomer?.customFields?.customerDocument}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-auto text-gray-300 flex flex-row bg-white gap-5 py-5 px-6 rounded-2xl">
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-col justify-between">
                <p className="text-primary font-semibold text-2xl">Endereço</p>
                <p>
                  {defaultAddress?.streetLine1},{" "}
                  {defaultAddress?.customFields?.number} -{" "}
                  {defaultAddress?.customFields?.neighborhood}
                  <br /> {defaultAddress?.city} - {defaultAddress?.province}
                </p>
                <p>CEP {defaultAddress?.postalCode}</p>
              </div>
              {activeCustomer?.addresses &&
                activeCustomer?.addresses.length > 1 && (
                  <FaExchangeAlt
                    onClick={() => setIsOpenChangeAddressModal(true)}
                    className="cursor-pointer text-primary"
                    size={20}
                  />
                )}
            </div>
          </div>
        </div>
        <div
          onClick={() => setIsOpenCreateAddressModal(true)}
          className="flex flex-row cursor-pointer items-center font-medium gap-1 mb-10 mt-2 justify-center sm:justify-end"
        >
          <AiOutlinePlusCircle
            size={20}
            className="sm:flex hidden text-gray-300"
          />
          <span className="text-primary underline underline-offset-4">
            Adicionar um novo endereço
          </span>
        </div>
        <div className="my-5 bg-gray-100 h-[2px] w-full" />
        <div className="flex flex-col-reverse sm:flex-row gap-5 my-10">
          <div className="grid sm:grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <ProductCard />
          </div>
          <div className="flex flex-col sm:max-w-[260px] w-full items-center gap-3">
            <Resume />
            <a className="text-gray-300 font-medium cursor-pointer hover:opacity-70 transition-opacity underline underline-offset-4">
              Solicitar análise de crédito
            </a>
          </div>
        </div>
        <div className="max-w-[80%] m-auto">
          <div className="flex items-center justify-center bg-white p-5 w-full rounded-lg mb-10">
            <p className="text-primary font-semibold text-center text-xl md:text-2xl lg:text-4xl">
              Deseja ser atendido por um vendedor?
            </p>
          </div>
          <div className="flex items-center justify-center mb-10 gap-5">
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <div className="flex flex-row items-center gap-3">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-8 h-8 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-200 text-sm">
                  Sim, desejo ser atendido por um vendedor.
                </span>
              </div>
              <div className="flex flex-row items-center gap-3">
                <input
                  id="red-radio"
                  type="radio"
                  value=""
                  name="colored-radio"
                  className="w-8 h-8 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-200 text-sm">
                  Não, desejo continuar sem um vendedor.
                </span>
              </div>
            </div>
          </div>
        </div>
      </CheckoutLayout>
    </>
  );
}

import { BiCheck, BiExit } from "react-icons/bi";
import React, { useEffect, useState } from "react";

import { BsGear } from "react-icons/bs";
import CreditRequests from "@/components/Account/CreditRequests";
import EditAccountModal from "@/components/Account/EditAccountModal";
import Image from "next/image";
import LastOrders from "@/components/Account/LastOrders";
import Orders from "@/components/Account/Orders";
import { removeItem } from "@/lib/storage";
import { toBRL } from "@/utils/toBRL";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useRouter } from "next/router";

export default function Account() {
  const [section, setSection] = useState(1);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();

  const [isLeaving, setIsLeaving] = useState(false);

  const { activeCustomer, refechActiveCustomer } = useActiveCustomer();
  useEffect(() => {
    if (isLeaving) {
      const timer = setTimeout(() => {
        setIsLeaving(false);
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLeaving]);
  return (
    <>
      {isOpenModal && (
        <EditAccountModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
      <div className="max-w-screen-lg m-auto px-5">
        <div className="flex flex-col sm:flex-row gap-3 mt-9">
          <div className="w-full flex flex-col mb-10">
            <div className="relative w-full h-full text-gray-300 flex flex-col sm:flex-row items-center sm:text-start text-center bg-white gap-5 py-5 px-6 rounded-2xl">
              <Image
                className="w-24 h-24 rounded-full object-cover"
                src={
                  activeCustomer?.customFields?.avatar
                    ? `https://cesconetto.globalsys.com.br:6333${activeCustomer?.customFields?.avatar?.preview}`
                    : "/no-profile.jpg"
                }
                unoptimized
                alt="profile image"
                width={100}
                height={100}
              />
              <div className="flex flex-col gap-1.5">
                <p className="text-primary ca font-semibold text-2xl">
                  Bem vindo,{" "}
                  <span className="capitalize">
                    {activeCustomer?.firstName}
                  </span>
                  !
                </p>
                <p>{activeCustomer?.emailAddress}</p>
                <div className="flex flex-row gap-3 items-center">
                  <span>Globalsys</span>
                  <div className="w-[1px] h-full bg-[#D9D8D8]" />
                  <span>1235678-53346/11</span>
                </div>
              </div>
              <div className="flex absolute top-2 right-2  p-1 rounded-md">
                {isLeaving ? (
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-sm text-secondary">Deseja sair?</span>
                    <BiCheck
                      onClick={() => {
                        removeItem("vendure-auth-token");
                        refechActiveCustomer();
                      }}
                      size={20}
                      className="text-secondary cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </div>
                ) : (
                  <BiExit
                    onClick={() => setIsLeaving(true)}
                    size={20}
                    className="text-secondary cursor-pointer hover:opacity-80 transition-opacity"
                  />
                )}
              </div>
            </div>
            <div
              onClick={() => setIsOpenModal(true)}
              className="flex flex-row items-center cursor-pointer hover:opacity-80 transition-opacity text-gray-300 sm:text-start text-center justify-center font-medium gap-1 mt-2 sm:justify-end"
            >
              <BsGear className="sm:block hidden" size={18} />
              <span className="underline underline-offset-4">
                Alterar ou atualizar informações de usúario
              </span>
            </div>
          </div>
          <div className="w-full flex flex-col mb-10">
            <div className="w-full h-full text-gray-300 flex flex-row bg-white gap-5 py-5 px-6 rounded-2xl">
              <div className="flex flex-col justify-between">
                <p className="text-primary font-semibold text-2xl">
                  Crédito disponível
                </p>
                <p className="text-lg font-medium">
                  {" "}
                  {toBRL.format(
                    Number(activeCustomer?.customFields?.availablelimit)
                  )}
                </p>
                <div className="flex flex-row gap-3 items-center">
                  <span>
                    Total:{" "}
                    {toBRL.format(
                      Number(activeCustomer?.customFields?.creditlimit)
                    )}
                  </span>
                  <div className="w-[1px] h-full bg-[#D9D8D8]" />
                  <span>
                    Utilizado:{" "}
                    {toBRL.format(
                      Number(activeCustomer?.customFields?.uselimit)
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center cursor-pointer hover:opacity-80 transition-opacity text-gray-300 sm:text-start text-center justify-center font-medium gap-1 mt-2 sm:justify-end">
              <span
                onClick={() => router.push("/credito/analise")}
                className="underline underline-offset-4"
              >
                Solicitar análise de crédito
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-evenly mt-10 mb-20 gap-5">
          <div
            onClick={() => setSection(2)}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            className="bg-white w-[177px] h-[177px] cursor-pointer hover:opacity-80 transition-opacity grid grid-rows-2 place-items-center p-3 text-center rounded-[25px] justify-center items-center"
          >
            <Image
              className="w-auto h-auto"
              src="/account/cartao.png"
              alt="profile image"
              width={100}
              height={100}
            />
            <span className="text-gray-600 font-semibold text-lg leading-[22px]">
              Aguardando pagamento
            </span>
          </div>
          <div
            onClick={() => setSection(2)}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            className="grid grid-rows-2 place-items-center cursor-pointer hover:opacity-80 transition-opacity bg-white w-[177px] h-[177px] p-3 text-center rounded-[25px] justify-center items-center"
          >
            <div className="relative">
              <Image
                className="w-auto h-auto"
                src="/account/caixa.png"
                alt="profile image"
                width={100}
                height={100}
              />{" "}
              <div className="w-8 h-8 right-[-10px] top-[0px] absolute rounded-full text-white flex items-center justify-center font-bold text-lg bg-secondary">
                23
              </div>
            </div>
            <span className="text-gray-600 font-semibold text-lg leading-[22px]">
              Pedido em processamento
            </span>
          </div>
          <div
            onClick={() => setSection(2)}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            className="bg-white w-[177px] h-[177px] cursor-pointer hover:opacity-80 transition-opacity grid grid-rows-2 place-items-center p-3 text-center rounded-[25px] justify-center items-center"
          >
            <Image
              className="w-auto h-auto"
              src="/account/enviado.png"
              alt="profile image"
              width={100}
              height={100}
            />
            <span className="text-gray-600 font-semibold text-lg leading-[22px]">
              Pedidos <br />
              enviados
            </span>
          </div>
          <div
            onClick={() => setSection(2)}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            className="bg-white w-[177px] h-[177px] cursor-pointer hover:opacity-80 transition-opacity grid grid-rows-2 place-items-center p-3 text-center rounded-[25px] justify-center items-center"
          >
            <Image
              className="w-auto h-auto"
              src="/account/pedido.png"
              alt="profile image"
              width={100}
              height={100}
            />
            <span className="text-gray-600 font-semibold text-lg leading-[22px]">
              Todos os <br /> pedidos
            </span>
          </div>
          <div
            onClick={() => setSection(3)}
            style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            className="bg-white w-[177px] h-[177px] cursor-pointer hover:opacity-80 transition-opacity grid grid-rows-2 place-items-center p-3 text-center rounded-[25px] justify-center items-center"
          >
            <Image
              className="w-auto h-auto"
              src="/account/moedas.png"
              alt="profile image"
              width={100}
              height={100}
            />
            <span className="text-gray-600 font-semibold text-lg leading-[22px]">
              Análise de <br /> crédito
            </span>
          </div>
        </div>
        {section === 1 && <LastOrders />}
        {section === 2 && <Orders />}
        {section === 3 && <CreditRequests />}
        <div className="flex flex-col sm:flex-row gap-5 sm:mx-10 mb-10">
          <div className="w-full flex flex-row items-center px-5 py-3 gap-3 rounded-lg bg-white">
            <Image src="/box1.png" alt="package image" height={42} width={42} />

            <span className="font-semibold text-primary text-xl">
              Meus pedidos em devolução
            </span>
          </div>
          <div
            onClick={() => router.push("/conta/devolucao-de-mercadoria")}
            className="cursor-pointer w-full flex flex-row items-center px-5 py-3 gap-3 rounded-lg bg-white"
          >
            <Image src="/box2.png" alt="package image" height={42} width={42} />
            <span className="font-semibold text-primary text-xl">
              Solicitar devolução
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

import * as yup from "yup";

import React, { useEffect, useRef, useState } from "react";
import {
  useSetCustomerAvatarMutation,
  useUpdateUserMutation,
} from "../../../generated/graphql";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../Button";
import Image from "next/image";
import Input from "../Input";
import Modal from "../Modal";
import { base64ToFile } from "@/utils/base64toFile";
import graphqlRequestClient from "@/lib/graphql.request";
import moment from "moment";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface CreditModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const editAccountSchema = yup.object().shape({
  firstName: yup.string().required("Campo obrigatório"),
  lastName: yup.string().required("Campo obrigatório"),
  phoneNumber: yup.string(),
  birthDate: yup.string(),
  customFields: yup.object().shape({
    customerDocument: yup.string(),
    company: yup.string(),
    birthdate: yup.string(),
    phone: yup.string(),
  }),
});

export default function EditAccountModal({
  isOpen,
  setIsOpen,
}: CreditModalProps) {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editAccountSchema),
  });

  const { activeCustomer, refechActiveCustomer } = useActiveCustomer();
  const { mutate: updateUser, isLoading } =
    useUpdateUserMutation(graphqlRequestClient);

  const [profileImage, setProfileImage] = useState<string | undefined>();
  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const openFileExplorer = () => {
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const { mutate: setAvatar } =
    useSetCustomerAvatarMutation(graphqlRequestClient);

  const editAccount = async (values: any) => {
    try {
      if (
        profileImage &&
        !profileImage?.includes("https://cesconetto.globalsys.com.br:6333")
      ) {
        const file = await base64ToFile(profileImage, "profile");

        setAvatar({
          file: file,
        });
      }

      updateUser(
        {
          input: {
            ...values,
            phoneNumber: values.phoneNumber?.replace(/\D/g, ""),
            customFields: {
              phone: values.customFields.phone.replace(/\D/g, ""),
              customerDocument: values.customFields.customerDocument.replace(
                /\D/g,
                ""
              ),
              birthdate: moment(values.customFields.birthdate),
              consumption: values.customFields.userType === "isConsumer",
              reseller: values.customFields.userType === "isDealer",
              subscription: values.customFields.subscription,
              company: values.customFields.company,
            },
          },
        },
        {
          onSuccess(data) {
            if (data.updateCustomer.id) {
              alert("Usuário editado com sucesso!");
              refechActiveCustomer();
              setIsOpen(false);
            } else {
              alert("Não foi possível editar o usuário, tente novamente!");
            }
          },
        }
      );
    } catch {}
  };

  const onChange = async (e: any) => {
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result as any);
    };

    if (files.length) {
      reader.readAsDataURL(files[0]);
    }
  };

  useEffect(() => {
    if (activeCustomer) {
      setValue("firstName", activeCustomer?.firstName);
      setValue("lastName", activeCustomer?.lastName);
      setValue("phoneNumber", activeCustomer?.phoneNumber);
      setValue(
        "customFields.customerDocument",
        activeCustomer?.customFields?.customerDocument
      );

      setValue(
        "customFields.birthdate",
        moment(activeCustomer?.customFields?.birthdate).format("DD/MM/YYYY")
      );

      setValue("customFields.company", activeCustomer?.customFields?.company);

      setValue("customFields.phone", activeCustomer?.customFields?.phone);

      if (activeCustomer?.customFields?.avatar) {
        setProfileImage(
          `https://cesconetto.globalsys.com.br:6333${activeCustomer?.customFields?.avatar?.preview}`
        );
      }
    }
  }, [activeCustomer]);

  return (
    <Modal title="Editar usuário" isOpen={isOpen} setIsOpen={setIsOpen}>
      <input
        ref={inputImageRef}
        id="file-upload"
        type="file"
        onChange={onChange}
        className="hidden"
      />
      <Image
        src={profileImage || "/no-profile.jpg"}
        alt="profile image"
        onChange={onChange}
        onClick={openFileExplorer}
        height={500}
        width={500}
        className="cursor-pointer hover:opacity-80 transition-opacity w-32 h-32 object-cover m-auto mt-5 rounded-full"
      />
      <form onSubmit={handleSubmit(editAccount)}>
        <div className="p-5">
          <div className="flex flex-col m-auto gap-5 w-full">
            <div className="flex flex-row justify-center gap-5 sm:gap-10 mt-5 mb-5">
              <label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    {...register("customFields.userType")}
                    id="field-is_consumer"
                    type="radio"
                    defaultChecked={!!activeCustomer?.customFields?.consumption}
                    value="isConsumer"
                    className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-gray-200 text-sm">Sou revendedor</span>
                </div>
              </label>
              <label>
                <div className="flex flex-col sm:flex-row items-center gap-3 text-gray-200 text-sm">
                  <input
                    {...register("customFields.userType")}
                    id="field-is_dealer"
                    type="radio"
                    defaultChecked={!!activeCustomer?.customFields?.reseller}
                    value="isDealer"
                    className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  Sou consumidor
                </div>
              </label>
            </div>
            <div className="flex flex-row gap-5">
              <Input
                register={register}
                placeholder="Nome"
                name="firstName"
                error={errors.firstName}
              />
              <Input
                register={register}
                placeholder="Sobrenome"
                name="lastName"
                error={errors.lastName}
              />
            </div>
            <div className="flex flex-row gap-5">
              <Input
                control={control}
                mask="(99) 99999-9999"
                name="phoneNumber"
                placeholder="Telefone celular*"
                error={errors.phoneNumber}
              />
              <Input
                control={control}
                mask="99.999.999/9999-99"
                name="customFields.customerDocument"
                placeholder="CNPJ"
              />
            </div>
            <div className="flex flex-row gap-5">
              <Input
                control={control}
                mask="99/99/9999"
                name="customFields.birthdate"
                placeholder="Data de nascimento"
              />
              <Input
                register={register}
                name="customFields.company"
                placeholder="Nome da empresa"
              />
            </div>

            <Input
              mask="(99) 9999-9999"
              control={control}
              name="customFields.phone"
              placeholder="Telefone comercial*"
            />
            <div className="flex flex-row items-center gap-2">
              <input
                defaultChecked={!!activeCustomer?.customFields?.subscription}
                {...register("customFields.subscription")}
                type="checkbox"
              />
              <span className="ml-2 text-sm text-gray-200 mt-1.5">
                Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou
                mensagens{" "}
              </span>
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

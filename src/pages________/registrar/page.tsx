import * as yup from "yup";

import React, { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import RegisterModal from "@/components/Register/RegisterModal";
import axios from "axios";
import graphqlRequestClient from "@/lib/graphql.request";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useRegisterCustomerAndAddressMutation } from "../../../generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";

type Address = {
  logradouro: string;
  localidade: string;
  cep: string;
  ibge: string;
  bairro: string;
  uf: string;
};

const companySchema = yup.object().shape({
  company: yup.string(),
  phoneNumber: yup.string().required("Campo obrigatório"),
  cep: yup.string(),
  customerDocument: yup.string().required("Campo obrigatório"),
});

const personalSchema = yup.object().shape({
  firstName: yup.string().required("Campo obrigatório"),
  lastName: yup.string().required("Campo obrigatório"),
  birthDate: yup.string(),
  phoneNumber: yup.string().required("Campo obrigatório"),
  emailAddress: yup
    .string()
    .email("Email inválido")
    .required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Senhas devem ser iguais")
    .required("Campo obrigatório"),
  checkPrivacyPolicies: yup
    .boolean()
    .oneOf([true], "Você precisa aceitar as políticas de privacidade"),
  userType: yup.string(),
  checkSubscription: yup.boolean(),
});

export default function Register() {
  const [registerData, setRegisterData] = useState({} as any);
  const [registerStatus, setRegisterStatus] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [address, setAddress] = useState({} as Address);
  const [step, setStep] = useState(1);

  const {
    handleSubmit: handleSubmitCompany,
    register: registerCompany,
    watch: watchCompany,
    control: controlCompany,
    formState: { errors: errorsCompany },
  } = useForm({
    resolver: yupResolver(companySchema),
  });

  const {
    handleSubmit: handleSubmitPersonal,
    register: registerPersonal,
    watch: watchPersonal,
    control: controlPersonal,
    formState: { errors: errorsPersonal },
  } = useForm({
    resolver: yupResolver(personalSchema),
  });

  // const { data: address } = useGetIbgeCodeByCepQuery(
  //   graphqlRequestClient,
  //   {
  //     cep: watchCompany("cep")?.replace(/\D/g, ""),
  //   },
  //   {
  //     enabled: watchCompany("cep")?.length === 9,
  //   }
  // );

  const { mutate: registerCustomerAndAddress, isLoading } =
    useRegisterCustomerAndAddressMutation(graphqlRequestClient);

  const registerAccount = async (values: any) => {
    const { firstName, lastName, userType, password, emailAddress } = values;

    try {
      await registerCustomerAndAddress(
        {
          input: {
            user: {
              firstName,
              lastName,
              emailAddress,
              phoneNumber: registerData.phoneNumber.replace(/\D/g, ""),
              password,
              customFields: {
                blocked: true,
                company: registerData.company,
                subscription: values.checkSubscription,
                birthdate: moment(values.birthDate) as any,
                consumption: userType === "isConsumer",
                reseller: userType === "isDealer",
                phone: values.phoneNumber.replace(/\D/g, ""),
                acceptterms: values.checkPrivacyPolicies,
                customerDocument: registerData.customerDocument.replace(
                  /\D/g,
                  ""
                ),
              },
            },
            address: {
              streetLine1: address?.logradouro || "",
              city: address?.localidade,
              province: address?.uf,
              company: registerData.company,
              countryCode: "BR",
              postalCode: address?.cep?.replace(/\D/g, ""),
              customFields: {
                IBGE: address?.ibge,
                neighborhood: address?.bairro,
              },
            },
          },
        },
        {
          async onSuccess(data) {
            setIsOpenModal(true);
            if (data?.registerCustomerAndAddress?.__typename === "BaseResult") {
              setRegisterStatus("approved");
            } else {
              setRegisterStatus("not-approved");
            }
          },
          onError() {
            setIsOpenModal(true);
            setRegisterStatus("not-approved");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitCompanyData = (data: any) => {
    setRegisterData(data);
    setStep(2);
  };

  useEffect(() => {
    if (watchCompany("cep")?.length === 9) {
      const getAddress = async () => {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${watchCompany("cep").replace(
            /\D/g,
            ""
          )}/json/`
        );
        setAddress(data);
      };
      getAddress();
    }
  }, [watchCompany("cep")]);

  return (
    <>
      {isOpenModal && (
        <RegisterModal
          name={watchPersonal("firstName")}
          registerStatus={registerStatus}
          isOpen={isOpenModal}
          setIsOpen={setIsOpenModal}
        />
      )}
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="flex flex-col p-5 sm:p-10 items-center justify-center bg-white my-10 max-w-3xl m-auto"
      >
        <h1 className="font-semibold text-2xl sm:text-4xl text-primary mb-8">
          Cadastre-se
        </h1>
        {step === 1 && (
          <form
            onSubmit={handleSubmitCompany(submitCompanyData)}
            className="flex flex-col w-full"
          >
            <p className="mb-1 text-sm text-gray-400">1. Dados empresariais</p>
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  register={registerCompany}
                  name="company"
                  placeholder="Nome da empresa"
                  error={errorsCompany.company}
                />
                <Input
                  mask="(99) 9999-9999"
                  control={controlCompany}
                  name="phoneNumber"
                  placeholder="Telefone comercial*"
                  error={errorsCompany.phoneNumber}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  mask="99999-999"
                  control={controlCompany}
                  name="cep"
                  placeholder="CEP"
                  error={errorsCompany.cep}
                />
              </div>
              <Input
                control={controlCompany}
                mask="99.999.999/9999-99"
                name="customerDocument"
                placeholder="CNPJ*"
                error={errorsCompany.customerDocument}
              />
              <p className="text-end text-gray-200 text-sm">
                (*) Campos obrigatórios
              </p>
            </div>
            <Button
              type="submit"
              className="py-3 !font-bold w-full max-w-md m-auto"
              variant="primary"
            >
              CONTINUAR CADASTRO
            </Button>
            <div className="bg-gray-100 mt-5 h-[1px] w-full" />
            <Link href="/entrar">
              <p className="text-primary hover:opacity-80 transition-opacity mt-5 sm:text-base text-sm text-center">
                Já possui cadastro?{" "}
                <span className="underline font-medium">Faça login</span>
              </p>
            </Link>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={handleSubmitPersonal(registerAccount)}
            className="flex flex-col w-full"
          >
            <p className="text-sm text-gray-400">2. Dados pessoais</p>
            <div className="flex flex-row justify-center gap-5 sm:gap-10 mt-5 mb-8">
              <label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    {...registerPersonal("userType")}
                    id="field-is_consumer"
                    type="radio"
                    defaultChecked
                    value="isConsumer"
                    className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-gray-200 text-sm">Sou revendedor</span>
                </div>
              </label>
              <label>
                <div className="flex flex-col sm:flex-row items-center gap-3 text-gray-200 text-sm">
                  <input
                    {...registerPersonal("userType")}
                    id="field-is_dealer"
                    type="radio"
                    value="isDealer"
                    className="w-5 h-5 text-red-600 cursor-pointer bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:bg-gray-700 dark:border-gray-600"
                  />
                  Sou consumidor
                </div>
              </label>
            </div>
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  register={registerPersonal}
                  name="firstName"
                  placeholder="Primeiro Nome*"
                  error={errorsPersonal.firstName}
                />
                <Input
                  register={registerPersonal}
                  name="lastName"
                  placeholder="Sobrenome*"
                  error={errorsPersonal.lastName}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  control={controlPersonal}
                  mask="99/99/9999"
                  name="birthDate"
                  placeholder="Data de nascimento"
                  error={errorsPersonal.birthDate}
                />
                <Input
                  control={controlPersonal}
                  mask="(99) 99999-9999"
                  name="phoneNumber"
                  placeholder="Telefone celular*"
                  error={errorsPersonal.phoneNumber}
                />
              </div>
              <Input
                register={registerPersonal}
                name="emailAddress"
                placeholder="Email*"
                error={errorsPersonal.emailAddress}
              />
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Input
                  register={registerPersonal}
                  type="password"
                  name="password"
                  placeholder="Senha*"
                  error={errorsPersonal.password}
                />
                <Input
                  register={registerPersonal}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha*"
                  error={errorsPersonal.confirmPassword}
                />
              </div>
              <p className="text-end text-gray-200 text-sm">
                (*) Campos obrigatórios
              </p>
            </div>
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex flex-row items-center gap-2">
                <input
                  {...registerPersonal("checkSubscription")}
                  type="checkbox"
                />
                <span className="ml-2 text-sm text-gray-200 mt-1.5">
                  Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou
                  mensagens{" "}
                </span>
              </div>
              <div>
                <div className="flex flex-row items-center gap-2">
                  <input
                    {...registerPersonal("checkPrivacyPolicies")}
                    type="checkbox"
                  />
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
                {errorsPersonal.checkPrivacyPolicies && (
                  <div className="mt-3 text-sm text-secondary">
                    {errorsPersonal.checkPrivacyPolicies.message as string}
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              className="py-3 !font-bold w-full max-w-md m-auto"
              variant="primary"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={24} />
              ) : (
                "CADASTRAR"
              )}
            </Button>
            <div className="bg-gray-100 mt-5 h-[1px] w-full" />
            <Link href="/entrar">
              <p className="text-primary hover:opacity-80 transition-opacity mt-5 sm:text-base text-sm text-center">
                Já possui cadastro?{" "}
                <span className="underline font-medium">Faça login</span>
              </p>
            </Link>
          </form>
        )}
      </div>
    </>
  );
}

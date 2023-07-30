import * as yup from "yup";

import {
  LoginMutation,
  LoginMutationVariables,
} from "../../../generated/graphql";
import React, { useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/Button";
import { GiExitDoor } from "react-icons/gi";
import Input from "@/components/Input";
import Link from "next/link";
import RecoveryPasswordModal from "@/components/Login/RecoveryPasswordModal";
import { gql } from "graphql-request";
import graphqlRequestClient from "@/lib/graphql.request";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .email("Email é inválido")
    .required("Email é obrigatório"),

  password: yup.string().required("Senha é obrigatória"),
});

const LOGIN_REQUEST = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on CurrentUser {
        __typename
        id
      }

      ... on InvalidCredentialsError {
        __typename
        errorCode
        message
      }

      ... on NotVerifiedError {
        __typename
        errorCode
        message
      }

      ... on ErrorResult {
        __typename
        errorCode
        message
      }
    }
  }
`;

export default function Login() {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { setAuthToken } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const { refechActiveCustomer } = useActiveCustomer();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginMutationVariables>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values: LoginMutationVariables) => {
    try {
      setIsLoading(true);
      const { data, headers } =
        await graphqlRequestClient.rawRequest<LoginMutation>(
          LOGIN_REQUEST,
          values
        );

      if (data.login.__typename === "CurrentUser") {
        setAuthToken(headers.get("vendure-auth-token")!);
        refechActiveCustomer();

        router.push("/");
      } else {
        alert(data.login.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  return (
    <>
      {openModal && (
        <RecoveryPasswordModal isOpen={openModal} setIsOpen={setOpenModal} />
      )}
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="flex flex-col py-10 px-5 items-center justify-center bg-white my-10 max-w-3xl m-auto"
      >
        <h1 className="font-semibold text-2xl sm:text-4xl text-primary mb-5">
          Já possui cadastro?
        </h1>
        <p className="text-primary sm:text-base text-sm mb-10">
          Faça login digitando o seu e-mail e senha.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          <Input
            register={register}
            name="username"
            placeholder="Email ou nome de usúario"
            error={errors.username}
          />
          <Input
            register={register}
            name="password"
            type="password"
            placeholder="Senha"
            error={errors.password}
          />
          <div className="w-full">
            <Button
              disabled={isLoading}
              className="py-3 gap-2 font-extrabold w-full"
              variant="primary"
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" size={24} />
              ) : (
                <GiExitDoor size={24} />
              )}
              ENTRAR
            </Button>
            <p
              onClick={() => setOpenModal(true)}
              className="text-primary cursor-pointer hover:opacity-80 transition-opacity text-end sm:text-base text-sm mt-2 mb-10"
            >
              Esqueceu a{" "}
              <span className="underline underline-offset-2">senha?</span>
            </p>
          </div>
        </form>
        <div className="bg-gray-100 h-[1px] w-full" />
        <Link href="/registrar">
          <p className="text-primary hover:opacity-80 transition-opacity mt-5 sm:text-base text-sm">
            Novo na Cesconetto? <span className="underline">Cadastre-se</span>
          </p>
        </Link>
      </div>
    </>
  );
}

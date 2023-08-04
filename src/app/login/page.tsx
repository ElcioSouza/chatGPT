"use client";

import * as yup from "yup";

import React, { Suspense, useEffect, useState } from "react";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import RegisterModal from "@/components/Register/RegisterModal";
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
/* import {MutationCreateCadUserArgs,CadInput,CadUser,CadUserResolvers,User,UserResolvers} from "../../../graphql/resolvers-type"; */
import GqlClient from '../../graphql/apollo-client';
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import {gql} from '@apollo/client';
import jwt from 'jsonwebtoken';
//import { cookies } from 'next/headers';
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
const companySchema = yup.object().shape({
  email: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});
// Defina o tipo da variável userToken explicitamente
type CookiesType = string | null;

export default function Login() {

  const [registerData, setRegisterData] = useState({} as any);
  const [userCookies, setUserCookies] = useState<CookiesType>(null)
  const [userLodding, setUserLodding] = useState<Boolean>(true)
  const [messagerUser, setMessagerUser] = useState("")
  
  const router = useRouter();
  const {
    handleSubmit, //você pode chamar para lidar com a submissão do formulário. Você pode atribuí-la a um evento de submissão do formulário para executar a validação dos campos e acionar a função de callback quando o formulário for enviado.
    register, //para registrar os campos do formulário. Você precisa atribuir o retorno dessa função aos elementos de entrada (input, select, textarea) do seu formulário para habilitar a validação e o rastreamento dos valores desses campos.
    /*     watch: watchCompany, */ //  para rastrear o valor de um campo específico. Você pode usá-la para acessar e monitorar o valor atual de um campo específico do formulário.
    control, //você pode usar para controlar um campo específico do formulário. Isso permite que você acesse e manipule o valor do campo, mesmo que ele esteja fora do escopo do register e não seja registrado explicitamente.
    formState: { errors }, //É um objeto que contém os erros de validação dos campos do formulário. Cada campo com erro terá uma propriedade correspondente neste objeto, contendo uma mensagem de erro.
  } = useForm({ 
    resolver: yupResolver(companySchema),
  });

  //const { mutate: MutationCreateCadUserArgs,isLoading } = MutationCreateCadUserArgs(graphqlRequestClient);

  const  userLoginSubmit = async (values: any) => {
   
    const { data } = await GqlClient.mutate({
      mutation: gql`
        mutation($email: String, $password: String) {
          userLogin(email: $email, password: $password) {
            email,
            password,
            name,
            id,
            dataFile,
            createdAt,
            updatedAt,
            token
          }
        }
      `,
      variables: {
        email: values.email,
        password: values.password
      }
    });
    function getCookie(name:String) {
      const cookieString = decodeURIComponent(document.cookie);
      const cookieArray = cookieString.split(';');
    
      for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
          return cookieValue.trim();
        }
      }
    
      return null; // Return null if the cookie is not found
    }

    // Example usage:
    const cookieName = 'token'; // Replace 'token' with the name of your cookie
    
    const cookieValue = getCookie(cookieName);
    

    function getCookieData(name:String) {
      const cookieString = decodeURIComponent(document.cookie);
      const cookieArray = cookieString.split(';');
    
      for (const cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
          return cookieValue.trim();
        }
      }
    
      return null; // Return null if the cookie is not found
    }
    // Function to set cookies
function setCookie(name: string, value: string, expirationTime: number) {
  const date = new Date();
  date.setTime(date.getTime() + expirationTime * 1000); // Expiration time in milliseconds
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + '; ' + expires + '; path=/';

}



if(!data || !data.userLogin) {
  setMessagerUser("Email ou senha mão confere");
  return;
}

    const expirationTime = 60 * 60; // 1 hour in seconds
    const token =  data.userLogin.token
    setCookie('token',token, expirationTime);
    
    const res = await fetch('/cookies', {
      method: 'POST',
      body: JSON.stringify({
        data: data.userLogin
      }),
  })
  
  const isPasswordMatch = await bcrypt.compare(values.password,data.userLogin.password);
  if(!isPasswordMatch) {
    setMessagerUser("Email ou senha não confere");
    return;
  }
  if(data.userLogin && data.userLogin.email == values.email && isPasswordMatch) {
      const json = await res.json()
      const user = json.user.data;
      const getCooki = getCookieData("token");
      setUserCookies(getCooki)
      const time = setTimeout(function(){
        router.push("/")
      },1000)
      //clearTimeout(time);
     }

  };
 
  useEffect(() => {
    setUserLodding(false);
  //}
  },[userCookies])

  //console.log('Valor de userCookies:', userCookies);
/* if(userLodding) {
  return <div>Carregando</div>
} */
  return (
    <div className="flex flex-col p-10 md:p-0 items-center justify-center h-full max-h-full">
   {!userCookies &&  (
    

    <div className="flex flex-col p-10 md:p-0 items-center md:max-w-2xl md:w-[100%] justify-center bg-white my-10 max-w-4xl m-auto rounded">
    <h1 className="font-semibold text-2xl  text-stone-950 mt-5 sm:text-4xl text-primary">
      Login
    </h1>

      <form
        onSubmit={handleSubmit(userLoginSubmit)}
        className="flex flex-col p-10 w-full"
        method="POST"
      >
         {messagerUser && <p className="text-red-500 my-3">{messagerUser}</p> }
        <div className="flex flex-col gap-3 mb-8">
              <Input
            register={register}
            name="email"
            placeholder="Email ou nome de usúario"
            error={errors.email}
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input
          register={register}
          name="password"
          type="password"
          placeholder="Senha"
          error={errors.password}
        />  
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <Button
           type="submit"
          className="py-3 !font-bold text-black w-full max-w-md m-auto bg-gray-900 my-1 text-white"
          variant="primary"
        >
          Login
        </Button>
        <Link href="/register">
          <p className="text-primary text-black hover:opacity-80 transition-opacity mt-5 sm:text-base text-sm text-center">
            Ainda não possuir?{" "}
            <span className="underline font-medium">Faça aqui</span>
          </p>
        </Link>
      </form>
 
  </div>    
   )}

   {userCookies && (

      <div className="flex flex-col p-10 md:p-0 items-center md:max-w-2xl md:w-[100%] justify-center bg-white max-w-4xl m-auto rounded">
        <h1 className="font-semibold text-2xl  text-stone-950 my-5 sm:text-4xl text-primary">
          Logado com Sucesso
        </h1>
     
      </div>   
   )}

    </div>
  );
}


"use client";

import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { useForm } from "react-hook-form";
//import {User} from "../../../graphql/resolvers-type";
import GqlClient from '../../graphql/apollo-client';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { yupResolver } from "@hookform/resolvers/yup";
import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import multer from "multer";

import path from "path";
import { useRouter } from "next/navigation";
const uploadsFolder = path.resolve(__dirname,"uploads")
const verificarEmailUnico = async  (email:string) => {
  const existingEmails = [email]; // Supondo que existingEmails é uma array com e-mails já existentes no banco de dados
  return !existingEmails.includes(email);
};
const companySchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  tel: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Insira um e-mail válido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório")
});


interface User {
  name: string;
  tel: string;
  email: string;
  password: string;
}


export default function Register() {
/*   const [dataUser, setDataUser] = useState<User[]>([]); */
  const [registerData, setRegisterData] = useState({} as any);
  const [registerMenssager, setRegisterMenssager] = useState(true);
  const [existingEmail, setExistingEmail] = useState("");
  //const [isOpenModal, setIsOpenModal] = useState(false);
  const [step, setStep] = useState(1);
  const [userLodding, setUserLodding] = useState<Boolean>(true)
  const [errorMenssager, setErrorMenssager] = useState("");
  const router = useRouter();

  const {
    handleSubmit, 
    register, 
    control, 
    formState: { errors },
  } = useForm({ 
    resolver: yupResolver(companySchema),
    defaultValues: {
      tel: '', // Provide default values for your form fields
    }
  });
  
  const getFileName = (values: HTMLFormElement): string | null => {
    //const fileValueName: string = values.file[0].name;
    const fileType =  values.file[0].type
    const fileExtension = fileType.split('/')[1]?.toLowerCase() || null;
    const randomFile = uuidv4() + '.' + fileExtension;
    if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
        return randomFile;
    }
    return null; 
  };
  const registerAccoun = async(values: any) => {}

const registerAccount = async (values: any) => {
  try {
 const randomFile = getFileName(values);

 if(!randomFile) {
  return false;
 }
 if(values.email && values.name && values.password && values.tel && randomFile) {    
    const { data,errors } = await GqlClient.mutate({
      mutation: gql`
        mutation($email: String, $name: String, $password: String, $tel: String, $dataFile: Upload) {
          createUserRegister(email: $email, name: $name, password: $password, tel: $tel, dataFile: $dataFile) {
            email,
            name,
            password,
            tel,
            dataFile,
            createdAt,
            updatedAt
            error
          }
        }
      `,
      variables: {
        email: values.email,
        name: values.name,
        password: values.password,
        tel: values.tel,
        dataFile: randomFile
      }
    });

    if (errors && errors.length > 0) {
      let error = errors[0].message
      setErrorMenssager(error)
      return;
     }
    setRegisterMenssager(false);
    const time = setTimeout(function() {
      router.push("/login")
    },1000)

   }
  } catch (error) {
    console.error('Erro do servidor:', error);
  }
}  

useEffect(() => {
  setUserLodding(false);
},[])

  return (
    <div className="flex flex-col p-10 md:p-0 items-center justify-center h-full max-h-full">
    {registerMenssager && (
 
      <div className="flex flex-col p-10 md:p-0 items-center justify-center bg-white my-10 max-w-4xl m-auto rounded">
        <h1 className="font-semibold text-2xl  text-stone-950 mt-5 sm:text-4xl text-primary">
          Cadastre-se
        </h1>
       
          <form
            onSubmit={handleSubmit(registerAccount)}
            className="flex flex-col p-10 w-full"
            encType="multipart/form-data"
          >
            <div className="flex flex-col gap-3 mb-8">
              <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="input_">
                <Input
                  name="email"
                  register={register}
                  placeholder="Email*"
                  error={errors.email} 
                />
                 {errors.email && <p className="text-red-500">{errors.email.message}</p>} {/* Exibe a mensagem de erro, se existir */}
                   {errorMenssager && <p className="text-red-500">{errorMenssager}</p> }
                 </div>
                 <div className="input_">
                <Input
                  name="password"
                  type="password"
                  register={register}
                  placeholder="Senha*"
                  error={errors.password} 
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <div className="input_">
                <Input
                  name="name"
                  register={register}
                  placeholder="Nome*"
                  error={errors.name} 
                />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}                  
                </div>
                <div className="input_">
                <Input
                mask="(99) 9999-99999"
                name="tel"
                register={register}
                control={control}
                placeholder="Telefone*"
                error={errors.tel}
                />
                  
                  </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
            <div className="input_">
                <Input
                  type="file"
                  name="file"
                  register={register}
                  accept=".png, .jpg, .jpeg"
                  
                />
            </div>
            </div>
            </div>

            <Button
              type="submit"
              className="py-3 !font-bold text-black w-full max-w-md m-auto bg-gray-900 my-1 text-white"
              variant="primary"
            >
              Cadastrar
            </Button>
          {/*   <div className="bg-gray-900 mt-5 h-[1px] w-full" /> */}
            <Link href="/login">
              <p className="text-primary text-black hover:opacity-80 transition-opacity mt-5 sm:text-base text-sm text-center">
                Já possui cadastro?{" "}
                <span className="underline font-medium">Faça login</span>
              </p>
            </Link>
          </form>
      
      </div>
      )}
    {!registerMenssager && (
      <div className="flex flex-col p-10 md:p-0 items-center md:max-w-2xl md:w-[100%] justify-center bg-white max-w-4xl m-auto rounded">
        <h1 className="font-semibold text-2xl  text-stone-950 my-5 sm:text-4xl text-primary">
          Cadastrado com sucesso
        </h1>
     
      </div>   
   )}
      </div>

  );
}

import { Button } from "@/components/Button";
import Input from "@/components/Input";
import React from "react";

export default function Recovery() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col py-10 px-5 items-center justify-center bg-white my-10 max-w-3xl m-auto"
    >
      <h1 className="font-semibold text-2xl sm:text-4xl text-primary mb-5">
        Recuperar senha
      </h1>
      <p className="text-primary sm:text-base text-center text-sm mb-10">
        Preencha os campos abaixo para criar uma nova senha.
      </p>
      <div className="flex flex-col gap-5 w-full max-w-md">
        <Input type="password" name="password" placeholder="Senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme a nova senha"
        />
        <Button className="py-3 font-extrabold w-full" variant="primary">
          CONFIRMAR
        </Button>
      </div>
    </div>
  );
}

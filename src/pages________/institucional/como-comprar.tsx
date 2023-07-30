import Image from "next/image";
import React from "react";

export default function HowToBuy() {
  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="max-w-screen-lg m-auto px-10 sm:px-20 py-10 my-10 bg-white font-semibold"
    >
      <h1 className="text-primary text-2xl sm:text-4xl mb-3">
        Cadastre sua empresa conosco
      </h1>
      <p className="font-medium text-gray-300 mb-8">
        Você pode cadastrar sua empresa com a ficha cadastral em nossas Lojas de
        Serra e Jardim América ou enviando a documentação abaixo para o e-mail:{" "}
        <span className="underline text-primary underline-offset-2">
          cadastro@cesconetto.com.br
        </span>{" "}
        ou no nosso whatsapp.
      </p>
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-3">
        Requisitos para cadastro
      </h1>
      <ul className="list-disc text-gray-300 ml-5 mb-8">
        <li>CNPJ Ativo (cópia do cartão em anexo)</li>
        <li>Contrato Social (anexo)</li>
        <li>RG ou CNH em anexo (Documento do responsável)</li>
        <li>Endereço completo</li>
        <li>Telefone/Celular e E-mail</li>
        <li>(Nome e cargo) Pessoas autorizadas para compra</li>
      </ul>
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-3">
        Cadastro de Microempreendedor Individual (MEI)
      </h1>
      <ul className="list-disc text-gray-300 ml-5 mb-8">
        <li>Certificado de MEI</li>
        <li>RG ou CNH em anexo (proprietário da empresa)</li>
        <li>Telefone/Celular e E-mail</li>
        <li>(RG ou CNH) Nome da pessoa autorizada para compra (anexo)</li>
      </ul>
      <div className="flex flex-col gap-2 mb-8">
        <p className="text-primary font-medium">
          Para Igrejas e Condomínios necessário apresentação dos anexos do
          documento do Síndico ou Pastor (Rg/CNH) e Ata do condomínio / Igreja
          atualizada.
        </p>
        <p className="text-primary font-medium">
          OBS: O cadastro será validado em nosso sistema após o envio da
          documentação completa e confirmação do setor responsável.
        </p>
        <p className="text-primary font-medium">
          Caso possa surgir alguma dúvida, ligue para (27) 2104-2143.
        </p>
      </div>
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-5">
        Formas de Pagamento
      </h1>
      <p className="text-gray-300 mb-4">Cartões de crédito ou débito:</p>
      <div className="flex flex-row gap-5 mb-8 flex-wrap sm:justify-start justify-center">
        <Image
          className="object-contain h-auto"
          src="/payment/banescard.png"
          alt="payment logo"
          width={115}
          height={69}
        />
        <Image
          className="object-contain h-auto"
          src="/payment/mastercard.png"
          alt="payment logo"
          width={91}
          height={71}
        />
        <Image
          className="object-contain h-auto"
          src="/payment/visa.png"
          alt="payment logo"
          width={130}
          height={42}
        />
        <Image
          className="object-contain h-auto"
          src="/payment/picpay.png"
          alt="payment logo"
          width={170}
          height={55}
        />
      </div>
      <p className="text-gray-300 mb-4">
        Boleto Bancário(Após análise do cadastro)
      </p>
      <div className="flex flex-row gap-5 mb-8 flex-wrap sm:justify-start justify-center">
        <Image
          className="object-contain h-auto"
          src="/payment/banescard.png"
          alt="payment logo"
          sizes="(max-width: 768px) 50vw, 100vw"
          width={115}
          height={69}
        />
        <Image
          className="object-contain h-auto"
          src="/payment/bradesco.png"
          alt="payment logo"
          sizes="(max-width: 768px) 50vw, 100vw"
          width={222}
          height={50}
        />
      </div>
      <p className="text-gray-300 mb-8">
        Cheque da empresa ou sócios. (Após consulta)
      </p>
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold mb-5">
        Compras a prazo
      </h1>
      <p className="text-gray-300 mb-3">
        (Só será liberado mediante documentação e após aprovação do cadastro)
      </p>
      <p className="text-gray-300 mb-3">
        Cópia do contrato social ou ultima alteração.
      </p>
      <p className="text-gray-300 mb-3">05 (cinco) Referências Comerciais.</p>
      <p className="text-gray-300 mb-5">
        Você pode fazer suas compras agendando a visita de um representante .
        Clique aqui e localize o representante de sua cidade.
      </p>
      <p className="text-gray-300">
        Você pode também fazer suas compras através da nossa Central de
        Televendas. Clique aqui.
      </p>
      <p className="text-gray-300 mb-3">
        Dúvidas? contate-nos via Fale Conosco, ou se preferir, entre em contato
        no telefone (27) 2104-2104.
      </p>
      <p className="text-gray-300">
        Você também pode fazer um orçamento a qualquer momento através de nosso
        site e nosso comercial entrará em contato.
      </p>
      <h1 className="text-primary text-2xl sm:text-4xl font-semibold text-center my-10">
        Boas compras!
      </h1>
    </div>
  );
}

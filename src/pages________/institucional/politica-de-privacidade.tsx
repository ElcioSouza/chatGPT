import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import React, { ReactNode, useState } from "react";

import Link from "next/link";

interface DropdownProps {
  title: string;
  children: ReactNode;
  index: number;
  activeIndex: number;
  setActiveIndex: (value: number) => void;
}

function Dropdown({
  title,
  children,
  index,
  activeIndex,
  setActiveIndex,
}: DropdownProps) {
  const isOpen = activeIndex === index;

  const toggleDropdown = () => {
    if (isOpen) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const states = [
    {
      id: 1,
      name: "ES",
    },
    {
      id: 1,
      name: "BA",
    },
    {
      id: 1,
      name: "MG",
    },
    {
      id: 1,
      name: "RJ",
    },
  ];

  return (
    <div
      style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
      className="flex flex-col justify-between bg-white text-primary px-5 sm:px-10 py-5 rounded-3xl"
    >
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center cursor-pointer"
      >
        <h1 className="text-xl md:text-4xl sm:text-2xl font-semibold">
          {title}
        </h1>
        {isOpen ? <FaAngleUp size={32} /> : <FaAngleDown size={32} />}
      </div>
      {isOpen && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function PrivacyPolicy() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const phoneNumber = "+552721042104";
  const email = "sac@cesconetto.com.br";

  return (
    <div className="max-w-screen-lg m-auto my-10 px-5 bg-transparent">
      <div
        style={{ boxShadow: "14px -6px 57px -14px rgba(0, 0, 0, 0.1)" }}
        className="bg-white px-5 sm:px-20 py-5 rounded-3xl mb-10"
      >
        <h1 className="text-2xl sm:text-4xl font-semibold text-primary mb-3">
          Políticas de privacidade
        </h1>
        <p className="text-gray-300">
          Leia com atenção a política de privacidade para conhecer os termos e
          condições em que suas informações pessoais serão armazenadas,
          utilizadas e protegidas em nosso site. Ao fornecer informações
          pessoais ou navegar no site, você estará automaticamente concordando
          com as regras de utilização, proteção e segurança aqui estabelecidas.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <Dropdown
          title="Frete Grátis"
          index={0}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <div className="">
            <p className="font-medium mb-3">
              Veja como obter frete GRÁTIS no seu pedido:
            </p>
            <ul className="list-disc ml-5 mb-5">
              <li>Grande Vitória compras no site a partir de R$ 200,00;</li>
              <li>
                Demais cidades do ES, BA*, MG* e RJ* compras a partir de
                R$300,00;
              </li>
              <li>
                Nossa área de atendimento são os estados do ES, BA, MG e RJ.
              </li>
            </ul>
            <p className="mb-5">
              Para verificar o custo, a disponibilidade ou a promoção de frete
              grátis para a sua região, informe o seu CEP no campo indicado no
              check-out.
            </p>
            <p>
              Para saber se a região dos estados de ES, BA, MG ou RJ é elegível
              para o frete grátis em compras acima de R$ 300,00, consulte as
              nossas políticas.
            </p>
            <b className="block mb-5">
              *Abaixo você encontra a tabela com todas as regiões que estão
              contempladas.
            </b>
            <p>
              Oferecemos essa vantagem para valorizar os nossos clientes e
              facilitar o acesso aos nossos produtos de qualidade. Aproveite
              essa oportunidade!
            </p>

            <div className="mt-5">
              <p className="font-medium mb-1">ES</p>
              <p>Aracruz, Pedro Canário, Nova Venécia, Vila Pavão, Pinheiros, Montanha, Mucurici,Ponto Belo,Ecoporanga, Agua Doce Do Norte, Barra De São Francisco, Cariacica,
                 Serra, Vila Velha, Vitoria, Guarapari, Baixo Guandu, Conceição da Barra, Jaguare, Linhares, Marilandia, Rio Bananal, São Mateus, Sooretama, Vila Velerio, Anchieta, Piuma, Presidente Kennedy, 
                 Marataizes, Itapemirim, Rio Novo Do Sul, Iconha, Alfredo Chaves, Governador Lindenberg, Mantenopolis, Alto Rio Novo, Marechal Floriano, Afonso Claudio, Vargem Alta, Domingos Martins,
                 Venda Nova Do Imigrante, Conceição Do Castelo, Brejetuba, Muniz Freire, Ibatiba, Iuna, Irupi, Itaguacu, Itarana, Santa Leopoldina, Fundão,Santa Teresa, São Roque Do Canaa,
                  Jão Neiva, Ibiracu,Viana
              </p>
              <p className="font-medium mb-2 mt-2">BA</p>
              <p>Alcobaça, Caravelas, Eunapolis, Ibirapuã, Itabatã, Itabela, Itamaraju, Itanhen, Lajedão, Medeiros Neto, Mucuri, Nova Viçosa, Posto Da Mata, Prado, Teixeira De Freitas,
                 Porto Seguro, Guaratinga</p>
              <p className="font-medium mb-2 mt-2">MG</p>
              <p>
              Patrocínio de Muriaé, Lajinha, Chalé, Durandé, Martins Soares, Manhumirim, Alto Jequitibá, Reduto, Manhuaçu, Luisburgo, Simonésia, Santana Manhuaçu, Realeza, São João Manhuaçu,
              Santo Amaro, Santa Margarida, Matipó, Caputira, São Pedro Avai, São Sebastião Sacramento, Santa Barbara Leste, Santa Rita Minas, Caratinga, Vargem Alegre, Entre folhas,
              Ubaporanga, Inhapim, São Domingo das Dores,Dom Cavati, Tarumirim, Fernandes Tourinho, Sobrália, Engenheiro Caldas, São João do Oriente, Iapu, Bugre, Ipaba, Ipatinga,
              Santana do Paraíso, Coronel Fabriciano, Timóteo, Piedade de Caratinga, Ipanema, Conceição de Ipanema, Taparuba, Pocrane, Padre Fialho, Abre Campo, Sericita, Rio Casca,
              Piedade de Ponte Nova, Urucânia, São Pedro dos Ferros, Raul Soares, Bom Jesus do Galho, Belo Oriente, Naque, Central De Minas, Pirapetinga, Tombos, Serra Dos Aimores,
              Periquito, Governador Valadares, Capitão Andrade, Itanhomi, Aimorés, Cuparaque, Galiléia, Itabirinha, Itueta, Mendes Pimentel, Nova Belém, Resplendor, São Félix de Minas,
              São João do Manteninha, Nanuque, Conselheiro Pena, Divino Das Laranjeiras, Mantena, Central De Minas,Pirapetinga, Tombos, Serra Dos Aimores, Mendes Pimentel, Nova Belém,
              Resplendor, São Félix de Minas, São João do Manteninha, Nanuque, Conselheiro Pena, Divino Das Laranjeiras, Mantena, Periquito, Governador Valadares, Capitão Andrade, Itanhomi,
              Aimorés, Cuparaque, Galiléia, Itabirinha, Itueta
              </p>
              <p className="font-medium mb-2 mt-2">RJ</p>
              <p>
              Portela, Cambuci, Morro do Coco (Distrito 12), Santo Eduardo, Bom Jesus Do Itabapoana, Italva, Cardoso Moreira, São José De Uba, Itaperuna, Varre-sai, Natividade,
              Porciuncula, Laje Do Muriaé, Miracema, Santo Antõnio De Padua, Itaocara, Sao Fidelis, Aperibe, Campos, Sao Joao Da Barra, Sao Francisco De Itabapoana
              </p>
            </div>
          </div>
        </Dropdown>
        <Dropdown
          title="Retirada"
          index={1}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p className="mb-5">
            Você pode fazer a sua compra em nosso site e escolher buscar os seus
            produtos em nossa loja física com sede no município da Serra/ES.
            Assim, você não paga pelo frete e pode retirar o seu pedido em um
            menor prazo.
          </p>
          <p className="mb-5">
            Seu pedido estará pronto para retirada em até 48h após confirmação
            do pagamento. Para retirar sua encomenda leve um documento original
            com foto.
          </p>
          <p>Endereço para retirada:</p>
          <p>
            Rod Gov. Mário Covas Km 266,56 | Planalto de Carapina | Serra/ES
            CEP 29162-703
          </p>
          <p className="mb-5">Horário de atendimento: 08:00 às 17:30h</p>
          <p className="mb-5">Seu pedido ficará disponível por 5 dias úteis.</p>
          <p>
            Após esse prazo entre em contato com nosso SAC
            <br /> Telefone:
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`tel:${phoneNumber}`}
            >
              27 2104-2104
            </Link>
            <br /> E-mail{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
            .
            <br /> Horário de funcionamento do SAC:
            <br /> Segunda a Sexta de 08:00 as 17:30 <br />
            Sábado de 08:00 às 12:00h
          </p>
        </Dropdown>
        <Dropdown
          title="Termos gerais"
          index={2}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p className="mb-5">
            Realizamos a entrega das compras nos estados do ES, BA, MG e RJ.
          </p>
          <p className="mb-5">
            O prazo de entrega é calculado a partir da confirmação do pagamento
            e poderá variar de acordo com a modalidade de entrega, da
            transportadora, período de campanhas, da localidade de entrega e da
            roteirização das áreas de atendimento.
          </p>
          <p className="mb-5">
            O cálculo do prazo de entrega leva em consideração as possibilidades
            acima mencionadas, informando ao cliente apenas o maior prazo.
          </p>
          <p className="mb-5">
            Quanto ao preço do frete, pode haver variação conforme peso,
            dimensão e a localidade.
          </p>
          <p className="mb-5">
            O valor e o prazo serão apresentados no momento do ckeck-out.
          </p>
          <p className="mb-5">
            As entregas serão realizadas por nossa rota própria, correios e
            transportadoras parceiras. Todo processo de rastreamento da entrega
            do seu produto poderá ser acompanhando.
          </p>
          <p className="mb-5">
            As entregas serão realizadas de segunda a sábado em horário
            comercial, não sendo possível agendamento de dias ou horários. Toda
            entrega deverá ser feita de acordo com a roteirização. Para a
            efetivação da entrega é necessário que no endereço do cadastro ou no
            endereço selecionado, tenha uma pessoa autorizada pelo comprador(a),
            portando documento de identificação e que legitime o protocolo de
            recebimento.
          </p>
          <p className="mb-5">
            Caso o pedido apresente, embalagem aberta ou danificada, produto
            deteriorado, ou produto em discordância com a compra, requeremos que
            recuse, informando no verso da nota fiscal o motivo do não
            recebimento.
          </p>
          <p className="mb-5">
            O CESCONETTO ATACADO não se responsabiliza pelo preenchimento
            incorreto ou incompleto do endereço de destino dos pedidos. Caso o
            endereçamento esteja incealizar novamente a entrega. Neste caso o
            cliente terá que pagar, pelo valor do frete para que a compra seja
            enviada para o local exato.
          </p>
          <p className="mb-5">
            Para frete via Correios e transportadoras parceiras serão realizadas
            até 02 (duas) tentativas, caso não seja efetivada a entrega devido a
            alguma inconsistência o pedido retornará para nosso centro de
            distribuição.
          </p>
          <p>
            Em caso de dúvidas e/ou maiores informações entre em contato com
            nosso SAC:
            <br /> Telefone:{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`tel:${phoneNumber}`}
            >
              27 2104-2104
            </Link>{" "}
            e/ou via e-mail{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
            .
            <br /> Horário de funcionamento do SAC:
            <br /> Segunda a Sexta de 08:00 as 17:30
            <br /> Sábado de 08:00 às 12:00h
          </p>
        </Dropdown>
        <Dropdown
          title="Política de trocas e devolução"
          index={3}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p className="mb-5">
            Asseguramos a qualidade de nossos produtos, com base no Código de
            Defesa do Consumidor.
          </p>
          <p className="mb-5">
            As trocas e devoluções de produtos deverão ser solicitadas através
            do nosso SAC via telefone:{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`tel:${phoneNumber}`}
            >
              27 2104-2104
            </Link>{" "}
            e/ou via e-mail{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
            , e dependerão de análise e autorização prévia de nossa área de
            pós-vendas.
          </p>
          <p className="mb-5">
            Ao solicitar a troca ou devolução via SAC, nossa equipe informará os
            protocolos a serem seguidos para efetivação. Caso seja aprovada a
            troca ou devolução, os produtos a serem devolvidos deverão estar em
            estado impecável, em sua embalagem original, sem violação, sem
            indícios de uso, acompanhados de sua respectiva nota fiscal, manual
            e todos os acessórios.
          </p>
          <b className="block mb-5">
            ATENÇÃO: Para desistência ou troca é necessário o contato em até 07
            (sete) dias corridos a contar de seu recebimento, através do SAC
            telefone:{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`tel:${phoneNumber}`}
            >
              27 2104-2104
            </Link>{" "}
            e/ou via e-mail{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
            .
          </b>
          <b className="block mb-5">
            Conforme artigo 49 do Código de Defesa do Consumidor, para compras
            não presenciais.
          </b>
          <p className="mb-5">
            Produtos que apresentarem defeito deverão ser comunicados ao nosso
            SAC no prazo de 07 (sete) dias corridos a contar de seu recebimento.
          </p>
          <p className="mb-5">
            Após esse período produtos que vierem a apresentar defeito de
            fabricação serão de responsabilidade do fabricante, ou seja, o
            contato deverá ser feito diretamente com a fábrica, caso o produto
            ainda esteja dentro do prazo de garantia. Para maiores informações,
            verifique o Termo de Garantia que acompanha o produto.
          </p>
          <p className="mb-5">
            Caso não obtenha êxito ao contactar o fornecedor, entre em contato
            com nosso serviço de atendimento ao cliente.
          </p>
          <p className="mb-5">
            Ressaltamos que todos os produtos passarão por análise prévia e
            deverão atender todos os requisitos, ou seja, estado impecável, em
            sua embalagem original, sem violação, sem indícios de uso,
            acompanhados de sua respectiva nota fiscal, manual e todos os
            acessórios.
          </p>
          <p>
            O prazo máximo para resolução será de 30 dias, após a análise e
            aprovação será liberado em nosso site o crédito referente ao valor
            devido, podendo ser utilizado para compra de novos produtos ou
            realizado o reembolso.
          </p>
        </Dropdown>
        <Dropdown
          title="Nota de devolução para contribuinte"
          index={4}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        >
          <p className="mb-5">
            A devolução só será realizada mediante a emissão da nota fiscal de
            devolução.
            <br /> Ao realizar o contato com nosso SAC dando início ao processo
            de devolução, informaremos os protocolos a serem seguidos e todos os
            campos que deverão conter na emissão da nota fiscal de devolução.
          </p>
          <p className="mb-5">
            Salientamos que <b>NÃO</b> deverão ser emitidos cobranças ou boletos
            contra o <b>CESCONETTO ATACADO</b>, referente a nota de devolução.
          </p>
          <p>
            Para maiores esclarecimentos, favor entrar em contato através
            <br />
            Telefone:{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`tel:${phoneNumber}`}
            >
              27 2104-2104
            </Link>{" "}
            <br /> E-mail:{" "}
            <Link
              className="underline underline-offset-2 hover:opacity-80"
              href={`mailto:${email}`}
            >
              {email}
            </Link>
            . <br />
            Horário de funcionamento do SAC: <br />
            Segunda a Sexta de 08:00 as 17:30 <br />
            Sábado de 08:00 às 12:00h{" "}
          </p>
        </Dropdown>
      </div>
    </div>
  );
}

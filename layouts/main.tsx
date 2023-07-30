import { ReactNode, useEffect, useState } from "react";

import { Cart } from "@/components/Cart";
import Dropdown from "@/components/Dropdown";
import { Footer } from "@/components/Footer";
import Head from "next/head";
import { Header } from "@/components/Header";
import PrivateRoute from "@/components/PrivateRoute";
import { TbAlertCircle } from "react-icons/tb";
import TermsModal from "@/components/TermsModal";
import { checkIsPublicRoute } from "@/utils/checkIsPublicRoute";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/router";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { openCart, setOpenCart } = useCart();

  const router = useRouter();

  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);

  const isPublicPage = checkIsPublicRoute(router.pathname!);

  const { activeCustomer } = useActiveCustomer();

  useEffect(() => {
    if (activeCustomer && !activeCustomer.customFields?.acceptterms) {
      setIsOpenTermsModal(true);
    }
  }, [activeCustomer]);

  return (
    <>
      {isOpenTermsModal && (
        <TermsModal isOpen={isOpenTermsModal} setIsOpen={setIsOpenTermsModal} />
      )}
      <div className="relative">
        <Head>
          <title>Cesconneto Atacado</title>
          <meta name="title" content="Cesconetto Atacado" />
          <meta
            name="description"
            content="A atividade como Atacadista. Com a expansão das atividades da empresa aliada a sua capacidade de atingir diversos segmentos de mercado como Atacadista de Papelaria, Informática, Escritório e Brinquedos, a mesma adquire um imóvel em Carapina na Serra com uma área de 12 mil m2, que passou a ser a Matriz do negócio e um grande Centro de Distribuição no Espírito Santo."
          />
          <meta
            name="keywords"
            content="papelaria, informática, melhor preço, o mais barato, material escolar barato, material escolar atacado, papepapelaria serra, papelaria vitoria, papelaria sp, cesconetto, fornecedor, preço de custo, serra-es,cesconetto cobilandia, cesconetto magazine, cesconetto vila velha, cesconetto atacado jardim américa, cesconetto itacibá, cesconetto papelaria jardim america, cesconetto industria e comercio de alimentos ltda, cesconetto vitoria es, cesconetto eunapolis, cesconetto doces, cesconetto atacado, cesconetto calçados, cesconetto auto peças, cesconetto atacado linhares, cesconeto atacadista, cesconetto atacado telefone, cesconetto autentica modas, cesconetto arquitetura, cesconeto aberturas, cesconetto atacado cnpj, cesconetto alimentos, cesconetto br 101, cesconetto bicicletas, braz cesconetto, bianca cesconetto, brenda cesconetto, granja cesconetto bahia, cesconetto papelaria e brinquedos, iriz braz cesconetto, cesconetto b atacado /b, cesconetto de cobilandia/b, cesconetto cariacica, cesconetto cobilandia telefone, cesconetto calçados cobilandia, cesconetto calçados serra, cesconetto cobilandia tel, cesconetto calçados, cesconetto calçados novo horizonte serra, cesconetto de cobilandia, cesconetto de itaciba, cesconetto distribuidora, cesconetto de vila velha(cobilandia), cesconeto de jardim america, cesconetto damiani advocacia, dayane cesconetto, diovana cesconetto, diego cesconetto, cesconetto es, cesconetto entulho, cesconetto esquadrias, cesconetto em itaciba, cesconetto em vitoria, cesconetto embalagens, cesconetto e rampinelli, cesconetto es serra, eduardo cesconetto, fabio cesconetto, familia cesconetto, fabiano cesconetto santos, fabio cesconetto telefone, fabiola cesconeto, fernando cesconetto, felipe cesconetto, fabio cesconetto votorantim, francielli cesconetto, fernanda cesconetto, cesconetto guarapari, gessykka cesconetto, giovani cesconetto, gianny cesconetto, gizelle cesconetto, grasielle cesconetto, guilherme cesconetto, gizely cesconetto, giliard cesconetto gava, cesconetto horario de atendimento, hiago cesconetto, cesconetto novo horizonte, cesconetto calçados novo horizonte, cesconetto itaciba, cesconetto itaciba telefone, cesconetto informatica itaciba, cesconetto informatica, cesconetto itaciba tel, cesconetto industria, igor cesconetto, irislane cesconetto, cesconetto jardim america, cesconetto jacaraipe, cesconetto jacaraipe telefone, cesconetto jardim america es, janderson cesconetto, jucemar cesconetto, julia cesconetto, juliana cesconetto, josiane cesconetto, jessica cesconetto, kelly cesconetto, katia cesconetto, kellyane cesconetto, kenia cesconetto, karla cesconetto, cassia cesconetto kroeff, ana katia cesconetto, cesconetto laranjeiras, cesconetto linhares es, cesconetto leitão da silva, cesconetto loja, loja cesconetto cobilandia, lojas cesconetto calçados, loja cesconetto itaciba, luciano cesconetto, leticia cesconetto, luciana cesconetto fernandes da silva, cesconetto material escolar, cesconetto magazine cobilandia, cesconetto magazine cariacica es, cesconetto magazine itacibá, cesconetto material de construção, cesconetto modas, cesconeto madeiras, cesconetto magazine site, cesconeto madeireira, nei cesconetto, cesconetto telefone, cesconetto online, cesconetto papelaria, cesconetto papelaria cariacica, cesconetto papelaria cobilandia, cesconetto papelaria serra, cesconetto papelaria vitoria, cesconetto papelaria es, cesconeto portas e janelas, cesconetto porto canoa, quadra cesconetto campo grande, quadra cesconetto, quadra cesconetto cariacica, cesconetto roupas, rodrigo cesconetto, rafaela cesconetto, ramon cesconetto silveira, ronaldo cesconetto, rogerio cesconeto, renato cesconetto dos santos, ricardo cesconetto dos santos, rodolfo cesconetto, ricardo cesconetto, cesconetto serra, cesconetto serra telefone, cesconetto sapatos, cesconetto serra sede, cesconetto serviços, simone cesconetto fernandes da silva, simone cesconetto, silvana cesconetto, site cesconetto atacado, samuel cesconetto, dr fabio s cesconetto, cesconetto telefone, cesconetto trabalhe conosco, cesconetto tel,telefone cesconetto cobilandia, telefone cesconetto serra, telefone cesconetto jardim america, telefone cesconetto itaciba, telefone cesconetto serra es, telefone cesconetto atacado, telefone cesconetto cariacica, cesconetto vitoria, cesconetto veiculos cachoeirinha, #vempracesconetto, cesconetto papelaria, cesconetto informática, cesconetto brinquedos, toystore, toy store."
          />
        </Head>
        <div
          className={`${
            openCart && "overflow-clip"
          } flex flex-col items-center h-screen m-auto`}
        >
          <Header openCart={openCart} setOpenCart={setOpenCart} />
          {activeCustomer?.customFields?.blocked && (
            <div className="flex items-center justify-center text-center flex-row text-secondary p-5 gap-3">
              <TbAlertCircle size={26} />
              <span>
                Atenção, cadastro ainda não validado pela Cesconetto. Os preços
                exibidos são apenas para consulta
              </span>
            </div>
          )}
          {openCart && (
            <Cart open={openCart} onClose={() => setOpenCart(false)} />
          )}
          {isPublicPage && <div className="w-full">{children}</div>}
          {!isPublicPage && (
            <PrivateRoute>
              <div className="w-full">{children}</div>
            </PrivateRoute>
          )}
          <div className="bg-[#F1F1F3] w-full mt-auto">
            <Footer />
          </div>
          <Dropdown />
        </div>
      </div>
    </>
  );
}

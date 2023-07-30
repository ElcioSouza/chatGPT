import Advantages from "@/components/Home/Advantages";
import { BestingSellingProducts } from "@/components/Home/BestSellingProducts";
import { Brands } from "@/components/Home/Brands";
import { Categories } from "@/components/Home/Categories";
import { FilteredProducts } from "@/components/Home/FilteredProducts";
import { HeroCarousel } from "@/components/Home/HeroCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full max-w-screen-xl m-auto text-white">
      <HeroCarousel>
        <Image
          className="h-auto w-auto"
          width={1280}
          height={340}
          src="/hero-banner.png"
          alt="category icon"
        />
        <Image
          className="h-auto w-auto"
          width={1280}
          height={340}
          src="/hero-banner.png"
          alt="category icon"
        />
      </HeroCarousel>
      <Categories />
      <div className="flex flex-row justify-center items-end mb-12 w-full">
        <div className="flex flex-col w-full mb-1.5 mr-3">
          <div className="cuttedTopLeft mr-3 mb-1 bg-primary" />
          <div className="cuttedBottomLeft bg-secondary" />
        </div>
        <span className="text-base md:text-4xl sm:text-2xl w-full text-primary whitespace-nowrap">
          Seu <b className="text-secondary font-bold">melhor parceiro</b> em
          négocios
        </span>
        <div className="flex flex-col w-full mb-1.5 ml-3">
          <div className="cuttedTopRight bg-primary ml-3 mb-1" />
          <div className="cuttedBottomRight bg-secondary" />
        </div>
      </div>
      <div className="hidden sm:flex bg-gray-50 w-full p-5 mb-12 flex-row items-center justify-center gap-10 text-black">
        <div className="flex flex-row items-center gap-2">
          <Image
            width={67}
            height={67}
            src="/advantages/free-shipping.png"
            alt="free shipping icon"
          />
          <div className="flex flex-col">
            <span className="leading-5">Frete Grátis</span>
            <span className="text-gray-150 text-xs">consulte*</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            width={57}
            height={57}
            src="/advantages/credit-card.png"
            alt="credit card icon"
          />
          <div className="flex flex-col">
            <span className="leading-5">
              Parcele em até <br />
              6x sem juros
            </span>
            <span className="text-gray-150 text-xs">consulte*</span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            width={67}
            height={67}
            src="/advantages/opened-box.png"
            alt="opened box icon"
          />
          <div className="flex flex-col">
            <span className="leading-5">
              Retire seu pedido
              <br /> em sua loja de
              <br /> preferência
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <Image
            width={57}
            height={57}
            src="/advantages/timer.png"
            alt="credit card icon"
          />
          <div className="flex flex-col">
            <span className="leading-5">
              Entrega em até <br /> 24h*
            </span>
            <span className="text-gray-150 text-xs">consulte*</span>
          </div>
        </div>
      </div>

      <FilteredProducts />
      <Image
        className="mb-20 h-auto w-auto"
        width={1280}
        height={240}
        src="/banner-2.png"
        alt="product image"
      />
      <Advantages />
      <BestingSellingProducts />
      <Brands />
    </div>
  );
}

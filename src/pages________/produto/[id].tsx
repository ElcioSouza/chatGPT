import { BsCheck2, BsFillShareFill } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  useGetProductReviewsQuery,
  useProductQuery,
} from "../../../generated/graphql";
import { useRef, useState } from "react";

import AddedProductModal from "@/components/Product/AddedProductModal";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GetColorName } from "hex-color-to-color-name";
import Image from "next/image";
import { Pagination } from "swiper";
import SimilarProducts from "@/components/Product/SimilarProducts";
import { StockLevelLabel } from "@/components/Product/StockLevelLabel";
import classNames from "classnames";
import graphqlRequestClient from "@/lib/graphql.request";
import { toBRL } from "@/utils/toBRL";
import useActiveCustomer from "@/hooks/useActiveCustomer";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/router";

export default function Product() {
  const [sectionOpen, setSectionOpen] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState("Tamanho único");
  const [selectedColor, setSelectedColor] = useState("#000");
  const [showPricing, setShowPricing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { activeCustomer } = useActiveCustomer();
  const { activeOrder, addItem } = useOrder();
  const router = useRouter();

  const { id } = router.query;

  const { data: reviews } = useGetProductReviewsQuery(
    graphqlRequestClient,
    {
      id: id as string,
    },
    { enabled: !!id }
  );

  const { data } = useProductQuery(
    graphqlRequestClient,
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  const quantityInCart =
    activeOrder?.lines?.find(
      (l) => l.productVariant.id === data?.product?.variants[0].id
    )?.quantity ?? 0;

  const toggleSection = (section: string) => {
    if (sectionOpen === section) {
      setSectionOpen(null);
    } else {
      setSectionOpen(section);
    }
  };
  const swiperRef = useRef<SwiperRef | null>(null);

  function hexToColorName(hex: string) {
    if (!hex) {
      return "";
    }

    const colorName = GetColorName(hex);

    if (colorName && !colorName.includes("Invalid Color")) {
      return colorName;
    }

    return "Cor desconhecida"; // Retorna o nome da cor ou uma mensagem de erro
  }

  const handleButtonClick = (slideId: string) => {
    const swiperInstance = swiperRef.current?.swiper;
    if (swiperInstance) {
      const slideIndex = swiperInstance.slides.findIndex(
        (slide) => slide.id === slideId
      );
      swiperInstance.slideTo(slideIndex);
    }
  };

  const product = {
    id: 124949,
    code: 37891,
    name: "Agenda Napoli",
    status: "Em estoque",
    discountPrice: 12.9,
    fullPrice: 21.9,
    wholesalePrice: 7.2,
    retailPrice: 7.92,
    rating: 5,
    amountReviews: 5,

    colors: ["#D9D9D9", "#C74E4E", "#3088A4", "#962398", "#70AA5C", "#000"],
    sizes: ["Tamanho único"],
    description: `<p>REFIL P-MOP GIRATORIO RMOP8210</p>`,
    additionalInformations: `<p><strong>ID:&nbsp;</strong>62395</p>
    <p><strong>C&oacute;digo:&nbsp;</strong>32476</p>
    <p><strong>Categoria:&nbsp;</strong>ART. FESTAS E UTILIDADES</p>
    <p><strong>Subcategoria:&nbsp;</strong>LIMPEZA-HIGIENE</p>
    <p><strong>Marca:&nbsp;</strong>FLASH LIMP</p>
    <p><strong>Unidade:&nbsp;</strong>UN</p>
    <p><strong>Tags:&nbsp;</strong>REFIL P-MOP GIRATORIO RMOP8210,ART. FESTAS E UTILIDADES,LIMPEZA-HIGIENE,FLASH LIMP,</p>`,
    images: [
      {
        id: 1,
        src: "/faroeste.jpg",
      },
      {
        id: 2,
        src: "/mala.jpg",
      },
      {
        id: 3,
        src: "/faroeste.jpg",
      },
    ],
  };

  const starClass = (index: number) => {
    return classNames({
      "text-gray-400": product.rating === 0,
      "text-primary": product.rating >= index,
    });
  };

  return (
    <>
      {isOpenModal && (
        <AddedProductModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
      )}
      <Image
        className="h-auto w-auto m-auto"
        width={1280}
        height={340}
        src="/hero-banner.png"
        alt="category icon"
      />
      <div className="max-w-screen-xl m-auto px-5">
        {" "}
        <Breadcrumbs
          values={["Papelaria", "Agenda", "Tilibra", "Agenda Napoli"]}
        />
        <div className="mb-10">
          <div className="flex flex-row justify-center md:justify-start items-start gap-5">
            <div className="hidden md:flex flex-col gap-5">
              {data?.product?.assets.map((item, index) => (
                <div
                  onClick={() => handleButtonClick(item.id.toString())}
                  className="w-[100px] h-auto bg-white px-8 py-5 cursor-pointer hover:opacity-70 transition-opacity"
                  key={index}
                >
                  <Image
                    src={item.source}
                    alt="product image"
                    width={50}
                    height={50}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex h-fit m-auto sm:m-0 max-w-[290px] sm:max-w-[350px] md:max-w-[350px] lg:max-w-[450px] w-full p-5 items-center px-10 bg-white shadow-product-2 justify-center">
                {data?.product?.assets.length === 0 ? (
                  <Image
                    className="object-cover h-auto w-auto"
                    src="/no-image.jpg"
                    width={500}
                    height={500}
                    alt="product image"
                  />
                ) : (
                  <Swiper
                    ref={swiperRef}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    {data?.product?.assets.map((item, index) => (
                      <SwiperSlide
                        className="cursor-grab flex mt-auto mb-auto"
                        id={item.id.toString()}
                        key={index}
                      >
                        <Image
                          className="object-cover h-auto w-auto"
                          src={item.source || "/no-image.jpg"}
                          width={500}
                          height={500}
                          alt="product image"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex items-baseline gap-3 mb-5">
                  <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary">
                    {data?.product?.name}
                  </h1>
                  <BsFillShareFill
                    className="text-gray-400 sm:flex hidden"
                    size={32}
                  />
                </div>
                <div className="text-gray-400 font-light md:flex items-center gap-2">
                  <span>Cód: {data?.product?.variants[0].sku}</span> |{" "}
                  <span>ID: {data?.product?.id}</span> |{" "}
                  {StockLevelLabel({
                    stockLevel: data?.product?.variants[0].stockLevel,
                  })}
                  <div className="hidden lg:flex flex-row items-center">
                    <span className="mr-1">|</span>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <span
                        key={index}
                        className={classNames("text-3xl", starClass(index))}
                      >
                        ★
                      </span>
                    ))}{" "}
                    <span className="ml-2 text-2xl font-medium text-gray-400">{`(${reviews?.getProductReviews.length})`}</span>
                  </div>
                </div>
                <span className="font-bold tracking-tight text-gray-150 line-through decoration-2">
                  {toBRL.format(
                    Number(data?.product?.variants[0].priceWithTax) / 100
                  )}
                </span>
                <span className="font-bold  text-4xl text-primary">
                  {toBRL.format(
                    Number(data?.product?.variants[0].priceWithTax) / 100
                  )}
                </span>
                <button className="underline underline-offset-4 mt-2 text-gray-400 font-bold">
                  Ver parcelas
                </button>
                <button
                  onClick={() => setShowPricing(!showPricing)}
                  className="text-primary font-medium flex mt-4 items-center gap-1"
                >
                  Precificação{" "}
                  {showPricing ? (
                    <FiChevronUp size={20} className="mt-1" />
                  ) : (
                    <FiChevronDown size={20} className="mt-1" />
                  )}
                </button>
                {showPricing && (
                  <div className="bg-white animate-fade-in-down text-gray-700 mt-1 font-medium flex flex-col px-3 py-2 rounded-xl">
                    <span>
                      Preço para Revenda:{" "}
                      <b className="text-primary">
                        {toBRL.format(product.wholesalePrice)}
                      </b>
                    </span>
                    <span>
                      Preço para Consumo{" "}
                      <b className="text-primary">
                        {toBRL.format(product.retailPrice)}
                      </b>
                    </span>
                  </div>
                )}

                <div className="mt-5">
                  <span>
                    Cor: <b>{hexToColorName(selectedColor)}</b>
                  </span>
                  <div className="flex flex-row gap-3 mt-3">
                    {product.colors.map((item) => (
                      <div
                        key={item}
                        className={`${
                          selectedColor === item
                            ? "border rounded-full p-1 border-black"
                            : ""
                        } flex items-center`}
                      >
                        <div
                          onClick={() => setSelectedColor(item)}
                          style={{ backgroundColor: item }}
                          className={`w-8 h-8 cursor-pointer rounded-full hover:opacity-70 transition-opacity`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5">
                  <span>
                    Medida: <b>{selectedSize}</b>
                  </span>
                  <div className="flex flex-row gap-3 mt-3">
                    {product.sizes.map((item) => (
                      <div
                        onClick={() => setSelectedSize(item)}
                        style={{ backgroundColor: item }}
                        key={item}
                        className="w-9 h-9 bg-gray-100 font-bold flex items-center justify-center cursor-pointer rounded-full hover:opacity-70 transition-opacity"
                      >
                        U
                      </div>
                    ))}
                  </div>
                </div>
                {!activeCustomer?.customFields?.blocked && (
                  <>
                    <button
                      onClick={() =>
                        addItem({
                          productVariantId: data?.product?.variants[0]
                            .id as string,
                          quantity: 1,
                          callback: () => setIsOpenModal(true),
                        })
                      }
                      className={classNames(
                        quantityInCart ? "bg-green" : "bg-primary",
                        "flex items-center justify-center mt-6 py-3 hover:opacity-70 transition-opacity font-bold w-full rounded-md text-white"
                      )}
                    >
                      {quantityInCart ? (
                        <span className="flex items-center">
                          <BsCheck2 size={22} className="mr-1" />{" "}
                          {quantityInCart} na sacola
                        </span>
                      ) : (
                        `Adicionar a sacola`
                      )}
                    </button>
                    <div className="flex font-medium flex-row mt-6 gap-1 text-gray-700">
                      <span>Consultar frete e prazo de entrega</span>
                      <FiChevronDown size={20} className="mt-1" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div
              onClick={() => toggleSection("description")}
              className="flex font-medium cursor-pointer flex-row mt-6 gap-1 text-gray-700"
            >
              <span>Descrição do produto</span>
              <FiChevronDown
                className={`mt-1 text-primary ${
                  sectionOpen === "description" ? "transform rotate-180" : ""
                }`}
                size={20}
              />
            </div>
            {/* <div
              onClick={() => toggleSection("additional-info")}
              className="flex font-medium cursor-pointer flex-row mt-6 gap-1 text-gray-700"
            >
              <span>Informações adicionais</span>
              <FiChevronDown
                className={`mt-1 text-primary ${
                  sectionOpen === "additional-info"
                    ? "transform rotate-180"
                    : ""
                }`}
                size={20}
              />
            </div> */}
          </div>
          <div
            className={`mt-3 animate-fade-in-down ${
              sectionOpen === "description" ? "block" : "hidden"
            }`}
            dangerouslySetInnerHTML={{
              __html: data?.product?.description || "",
            }}
          />
          {/* <div
            className={`mt-3 animate-fade-in-down ${
              sectionOpen === "additional-info" ? "block" : "hidden"
            }`}
            dangerouslySetInnerHTML={{
              __html: product.additionalInformations,
            }}
          /> */}
        </div>
        <SimilarProducts product={data?.product} />
      </div>
    </>
  );
}

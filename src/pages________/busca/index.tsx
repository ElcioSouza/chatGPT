import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import {
  useCollectionsQuery,
  useFacetsQuery,
  useSearchQuery,
} from "../../../generated/graphql";
import { useEffect, useState } from "react";

import { BiChevronDown } from "react-icons/bi";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import graphqlRequestClient from "@/lib/graphql.request";
import { toBRL } from "@/utils/toBRL";
import useOrder from "@/hooks/useOrder";
import { useRouter } from "next/router";

export default function Categories() {
  const router = useRouter();
  const { text, cat, sub, page } = router.query as {
    text: string;
    cat: string;
    sub: string;
    page: string;
  };

  const { addItem } = useOrder();

  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState("price");

  const handleAddrTypeChange = (e: any) => {
    setSort(e.target.value);
  };

  let itemsPerPage = 10;

  const options = [
    {
      title: "Preço",
      value: "price",
    },

    { title: "Nome", value: "name" },
  ];

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const { data: collections } = useCollectionsQuery(graphqlRequestClient);
  const { data: facets } = useFacetsQuery(
    graphqlRequestClient,
    {
      options: {
        filter: {
          name: {
            in: [cat?.replaceAll("-", " ")],
          },
        },
      },
    },
    {
      enabled: !!cat,
    }
  );

  const { data: search } = useSearchQuery(
    graphqlRequestClient,
    {
      input: {
        filter: {
          facetValueIds: sub ? [sub] : undefined,
          collectionSlugs: cat ? [cat] : undefined,
        },
        term: text as string,
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
      },
    },
    {
      onSuccess(data) {
        if (data.searchCustom?.totalItems) {
          setTotalProducts(data.searchCustom.totalItems);
        }
      },
    }
  );

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, []);

  return (
    <>
      <Image
        className="h-auto w-auto m-auto"
        width={1280}
        height={340}
        src="/hero-banner.png"
        alt="category icon"
      />
      <div className="flex flex-col gap-5 mt-10 max-w-screen-xl m-auto px-5">
        {text && (
          <div className="flex items-center flex-row gap-1">
            <span className="font-bold">Buscando por:</span>
            {`'${text}'`}
            <div className="bg-secondary text-white rounded-md ml-5 p-1">
              <AiOutlineClose
                size={18}
                className="cursor-pointer"
                onClick={() => {
                  router.replace({
                    query: { ...router.query, text: undefined },
                  });
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        )}
        <div className="flex flex-col mb-10">
          <div className="flex flex-row gap-10">
            <div className="mt-8 sm:flex flex-col hidden w-[200px]">
              <h1 className="flex flex-row items-end gap-2 font-bold text-2xl text-primary mb-5">
                <HiAdjustmentsHorizontal size={28} /> Filtrar
              </h1>
              <div className="flex flex-col gap-3 mb-5">
                {cat && (
                  <div className="flex flex-row justify-between gap-3 items-center bg-matte-blue text-white rounded-lg px-3 py-2">
                    <span>
                      Filtrando por{" "}
                      <b>
                        {
                          collections?.collections.items.find(
                            (item) => item.slug === cat
                          )?.name
                        }
                      </b>
                    </span>
                    <div>
                      <AiOutlineClose
                        size={18}
                        className="cursor-pointer"
                        onClick={() => {
                          setCurrentPage(1);
                          router.replace({
                            query: { ...router.query, cat: undefined },
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
                {sub && (
                  <div className="flex justify-between flex-row gap-3 items-center bg-matte-blue text-white rounded-lg px-3 py-2">
                    <span>
                      Filtrando por{" "}
                      <b>
                        {
                          facets?.facets.items[0].values.find(
                            (item) => item.code === sub
                          )?.name
                        }
                      </b>
                    </span>
                    <div>
                      <AiOutlineClose
                        size={18}
                        className="cursor-pointer"
                        onClick={() => {
                          setCurrentPage(1);
                          router.replace({
                            query: { ...router.query, sub: undefined },
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-primary">Categorias</h1>

                <div className="flex flex-col gap-5 my-3">
                  {collections?.collections.items
                    .filter(
                      (collection) => collection.slug !== "mercadoria-em-falta"
                    )
                    .map((item) => (
                      <span
                        onClick={() =>
                          router.replace({
                            query: { ...router.query, cat: item.slug },
                          })
                        }
                        className="capitalize cursor-pointer hover:opacity-70 transition-opacity"
                        key={item.slug}
                      >
                        {item.name}
                      </span>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-primary">
                  Subcategoria
                </h1>
                <div className="flex flex-col gap-5 my-3">
                  {facets?.facets.items[0].values.slice(0, 4).map((item) => (
                    <span
                      onClick={() =>
                        router.replace({
                          query: { ...router.query, sub: item.code },
                        })
                      }
                      className="capitalize cursor-pointer hover:opacity-70 transition-opacity"
                      key={item.code}
                    >
                      {item.name}
                    </span>
                  ))}
                  <b className="text-primary">Ver mais</b>
                </div>
              </div>
              {/* <div className="flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-primary">Marcas</h1>
                <div className="flex flex-col gap-5 my-3">
                  {subCategories.map((item) => (
                    <span
                      className="cursor-pointer hover:opacity-70 transition-opacity"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col sm:gap-0 gap-3 sm:flex-row justify-between w-full">
                <div className="font-semibold sm:mt-0 mt-3 sm:text-base text-sm text-gray-400">
                  Pág. {currentPage} de {totalPages} - {totalProducts}{" "}
                  Produto(s)
                </div>
                <div className="flex sm:text-base text-sm flex-row items-center font-semibold text-gray-400">
                  Ordenar
                  <div className="relative ml-2">
                    <select
                      onChange={(e) => handleAddrTypeChange(e)}
                      className="w-[162px] block text-sm pl-5 font-medium appearance-none bg-transparent border border-primary cursor-pointer text-gray-200 py-2 pr-4 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-primary"
                    >
                      {options.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                      <BiChevronDown size={28} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 w-full h-[2px] mt-3 mb-8" />
              <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {search?.searchCustom?.items.map((item) => (
                  <div
                    onClick={() => router.push(`/produto/${item.productId}`)}
                    className="flex cursor-pointer flex-col px-3 justify-end w-[185px] h-[268px] bg-white rounded-lg shadow-product py-5"
                    key={item?.productId}
                  >
                    <Image
                      className="mb-5 m-auto"
                      width={80}
                      height={80}
                      src={item?.productPreview || "/no-image.jpg"}
                      alt="product image"
                    />
                    <p className="text-secondary font-bold text-sm mb-1 text-center line-clamp-2">
                      {item?.productName}
                    </p>
                    {item?.price && (
                      <p className="text-center text-primary font-bold my-1">
                        {toBRL.format(item?.price / 100 || 0)}
                      </p>
                    )}
                    {item.productId && (
                      <button
                        onClick={(ev) => {
                          ev.stopPropagation();
                          addItem({
                            productVariantId:
                              item.productId?.toString() as string,
                            quantity: 1,
                          });
                        }}
                        className="bg-secondary font-extrabold flex text-xs flex-row rounded-[3px] justify-center items-center text-white gap-1 py-1.5 w-4/5 mx-auto hover:opacity-70 transition-opacity"
                      >
                        <AiOutlineShoppingCart size={18} />
                        COMPRAR
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}

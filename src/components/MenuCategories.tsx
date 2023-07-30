import { FaChevronRight } from "react-icons/fa";
import React from "react";
import graphqlRequestClient from "@/lib/graphql.request";
import { useCollectionsQuery } from "../../generated/graphql";
import { useRouter } from "next/router";

interface MenuCategoriesProps {
  setShow: (value: boolean) => void;
}

export default function MenuCategories({ setShow }: MenuCategoriesProps) {
  const router = useRouter();

  const { data: categories } = useCollectionsQuery(graphqlRequestClient);

  return (
    <div
      id="dropdown"
      className="z-10 absolute top-16 bg-white shadow w-[300px]"
    >
      <div className="pt-2 px-4 text-xl text-primary font-semibold">
        Todas as categorias
      </div>
      <div
        className="py-2 px-4 text-base font-semibold text-gray-700"
        aria-labelledby="dropdownDefaultButton"
      >
        {categories?.collections.items.map((item) => (
          <div
            onClick={() => {
              router.push({
                pathname: "/busca",
                query: {
                  ...router.query,
                  cat: item.slug,
                },
              });
              setShow(false);
            }}
            key={item.id}
            className="capitalize flex cursor-pointer flex-row items-center hover:opacity-80 transition-opacity justify-between"
          >
            <span className="block py-2">{item.name}</span>
            <FaChevronRight className="text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}

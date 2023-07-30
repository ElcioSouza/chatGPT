import { ProductsQuery, useProductsQuery } from "../../generated/graphql";
import { ReactNode, createContext, useState } from "react";

import graphqlRequestClient from "@/lib/graphql.request";

interface ProductsProviderProps {
  children: ReactNode;
}

type ProductsContextData = {
  products: ProductsQuery["products"]["items"] | undefined;
  refetchProducts: () => void;
};

export const ProductsContext = createContext({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const { data, refetch } = useProductsQuery(graphqlRequestClient);

  return (
    <ProductsContext.Provider
      value={{
        products: data?.products.items,
        refetchProducts: refetch,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

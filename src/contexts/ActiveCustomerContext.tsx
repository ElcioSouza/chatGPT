
// importando os type script para tipar
import {
  ActiveCustomerQuery,
  useActiveCustomerQuery,
} from "../../generated/graphql";

import { ReactNode, createContext, useContext, useEffect } from "react";

import graphqlRequestClient from "../lib/graphql.request";
import { removeItem } from "@/lib/storage";

interface ActiveCustomerProviderProps {
  children: ReactNode;
}

type ActiveCustomerContextData = {
  isSignedIn: boolean;
  refechActiveCustomer: () => void;
  activeCustomer: ActiveCustomerQuery["activeCustomer"] | undefined;
  isFetchedActiveCustomer: boolean;
};

export const ActiveCustomerContext = createContext(
  {} as ActiveCustomerContextData
);

export function ActiveCustomerProvider({
  children,
}: ActiveCustomerProviderProps) {
  const {
    data,
    isFetched,
    refetch: refechActiveCustomer,
  } = useActiveCustomerQuery(graphqlRequestClient);

  const isSignedIn = !!data?.activeCustomer?.id;

  return (
    <ActiveCustomerContext.Provider
      value={{
        isSignedIn,
        refechActiveCustomer,
        activeCustomer: data?.activeCustomer,
        isFetchedActiveCustomer: isFetched,
      }}
    >
      {children}
    </ActiveCustomerContext.Provider>
  );
}

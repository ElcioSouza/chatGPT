import {
  ActiveOrderQuery,
  AddItemToOrderMutation,
  AdjustOrderLineMutation,
  Exact,
  RemoveOrderLineMutation,
  useActiveOrderQuery,
  useAddItemToOrderMutation,
  useAdjustOrderLineMutation,
  useRemoveOrderLineMutation,
} from "../../generated/graphql";
import { ReactNode, createContext } from "react";

import { UseMutateFunction } from "@tanstack/react-query";
import graphqlRequestClient from "@/lib/graphql.request";

interface AddItemProps {
  productVariantId: string;
  quantity: number;
  callback?: () => any;
}
interface OrderProviderProps {
  children: ReactNode;
}

type OrderContextData = {
  activeOrder: ActiveOrderQuery["activeOrder"] | undefined;
  refetchActiveOrder: () => void;
  addItem: ({ productVariantId, quantity, callback }: AddItemProps) => void;
  adjustItem: (orderLineId: string, quantity: number) => void;
  removeItem: (orderLineId: string) => void;
};

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
  const { data, refetch: refetchActiveOrder } =
    useActiveOrderQuery(graphqlRequestClient);

  const { mutate: addItemToOrder } =
    useAddItemToOrderMutation(graphqlRequestClient);

  const { mutate: removeOrderLine } =
    useRemoveOrderLineMutation(graphqlRequestClient);

  const { mutate: adjustOrderLine } =
    useAdjustOrderLineMutation(graphqlRequestClient);

  const addItem = ({ productVariantId, quantity, callback }: AddItemProps) => {
    addItemToOrder(
      {
        productVariantId: productVariantId || "",
        quantity: quantity,
      },
      {
        async onSuccess(data) {
          if (data.addItemToOrder.__typename === "Order") {
            callback;
            refetchActiveOrder();
          } else {
            alert(data.addItemToOrder.message);
          }
        },
      }
    );
  };

  const adjustItem = (orderLineId: string, quantity: number) => {
    adjustOrderLine(
      {
        orderLineId,
        quantity,
      },
      {
        onSuccess(data) {
          if (data.adjustOrderLine.__typename === "Order") {
            refetchActiveOrder();
          } else {
            alert(data.adjustOrderLine.message);
          }
        },
      }
    );
  };

  const removeItem = (orderLineId: string) => {
    removeOrderLine(
      {
        orderLineId,
      },
      {
        onSuccess(data) {
          if (data.removeOrderLine.__typename === "Order") {
            refetchActiveOrder();
          } else {
            alert(data.removeOrderLine.message);
          }
        },
      }
    );
  };

  return (
    <OrderContext.Provider
      value={{
        addItem,
        adjustItem,
        removeItem,
        refetchActiveOrder,
        activeOrder: data?.activeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

import { OrderContext } from "@/contexts/OrderContext";
import { useContext } from "react";

const useOrder = () => {
  return useContext(OrderContext);
};

export default useOrder;

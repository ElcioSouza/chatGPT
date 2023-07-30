import { ActiveCustomerContext } from "@/contexts/ActiveCustomerContext";
import { useContext } from "react";

const useActiveCustomer = () => {
  return useContext(ActiveCustomerContext);
};

export default useActiveCustomer;

import { ProductsContext } from "@/contexts/ProductsContext";
import { useContext } from "react";

const useProducts = () => {
  return useContext(ProductsContext);
};

export default useProducts;

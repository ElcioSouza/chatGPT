import { ReactNode, createContext, useState } from "react";

interface CartProviderProps {
  children: ReactNode;
}

type CartContextData = {
  openCart: boolean;
  setOpenCart: (value: boolean) => void;
};

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const [openCart, setOpenCart] = useState(false);

  return (
    <CartContext.Provider
      value={{
        openCart,
        setOpenCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

import React, { useCallback } from "react";

import { Button } from "../Button";
import { FaCheck } from "react-icons/fa";
import Modal from "../Modal";
import useCart from "@/hooks/useCart";

interface AddedProductModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function AddedProductModal({
  isOpen,
  setIsOpen,
}: AddedProductModalProps) {
  const { setOpenCart } = useCart();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setOpenCart(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setIsOpen, setOpenCart]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex justify-center text-primary font-semibold text-3xl pb-5">
        <FaCheck size={42} />
      </div>
      <div className="max-w-sm m-auto">
        <p className="text-center text-xl leading-relaxed text-gray-600">
          Item adicionado ao seu carrinho!
        </p>
      </div>
      <div className="mt-5 mb-10 max-w-md m-auto">
        <Button onClick={handleClose} className="w-full py-3" variant="primary">
          VER CARRINHO
        </Button>
      </div>
    </Modal>
  );
}

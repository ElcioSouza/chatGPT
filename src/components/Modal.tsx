import React, { ReactNode, useRef } from "react";

import { Button } from "./Button";
import { IoCloseOutline } from "react-icons/io5";
import classNames from "classnames";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
  width?: string;
}

export default function Modal({
  isOpen,
  setIsOpen,
  children,
  onClose,
  width,
  title,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      setIsOpen(false);
      onClose && onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      onClick={closeModal}
      className={`${
        !isOpen ? "hidden" : ""
      } flex fixed z-[999] w-full sm:top-auto top-0 bg-[#47474E] bg-opacity-20 overflow-x-hidden overflow-y-auto md:inset-0 md:h-full h-full`}
    >
      <div
        className={classNames(
          width,
          "relative w-full h-full sm:max-w-2xl m-auto md:h-auto"
        )}
      >
        <div className="relative bg-white sm:h-auto h-full shadow">
          <div className="flex items-center justify-between p-4 pb-0 rounded-t">
            {title && (
              <span className="text-primary font-semibold text-3xl ">
                {title}
              </span>
            )}
            <button
              onClick={() => {
                setIsOpen(false);
                onClose && onClose();
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:opacity-80 transition-opacity rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-hide="defaultModal"
            >
              <IoCloseOutline size={32} />
            </button>
          </div>
          <div className="mx-3 pb-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

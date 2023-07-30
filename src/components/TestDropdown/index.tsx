import {
  useActiveChannelQuery,
  useChannelsQuery,
} from "../../../generated/graphql";
import { useEffect, useRef, useState } from "react";

import { AiOutlineShop } from "react-icons/ai";
import { TbArrowsExchange } from "react-icons/tb";
import graphqlRequestClient from "@/lib/graphql.request";
import { setItem } from "@/lib/storage";
import useProducts from "@/hooks/useProducts";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { data } = useChannelsQuery(graphqlRequestClient);

  const { data: activeChannel, refetch } =
    useActiveChannelQuery(graphqlRequestClient);
  const { refetchProducts } = useProducts();

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-5 z-50 right-5" ref={dropdownRef}>
      <div className="flex justify-end flex-col relative min-w-[200px] h-[200px]">
        <button
          className="flex text-white justify-center gap-3 items-center shadow-product bg-secondary font-semibold py-2 px-4 rounded"
          onClick={toggleDropdown}
        >
          <span>
            {activeChannel?.activeChannel.code === "__default_channel__" ||
            !activeChannel?.activeChannel.code
              ? "Selecione uma loja"
              : activeChannel?.activeChannel.code}
          </span>
          {activeChannel?.activeChannel &&
          activeChannel?.activeChannel.code !== "__default_channel__" ? (
            <TbArrowsExchange size={24} />
          ) : (
            <AiOutlineShop size={24} />
          )}
        </button>
        {isOpen && (
          <div
            className={`absolute top-[-5rem] w-full rounded-md shadow-lg transition-opacity duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0"
            }`}
          >
            <div className="bg-white rounded-md py-1">
              {data?.channels.map((item) => (
                <a
                  key={item.token}
                  href="#"
                  onClick={async () => {
                    setItem("channel-token", item.token);
                    toggleDropdown();
                    refetch();
                    refetchProducts();
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {item.code}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

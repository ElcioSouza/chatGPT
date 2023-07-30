import React, { useRef } from "react";

import { HiChevronDown } from "react-icons/hi2";
import classNames from "classnames";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    title: string;
  }[];
  register?: any;
  name: string;
}

export default function Select({
  name,
  options,
  register,
  className,
  ...rest
}: SelectProps) {
  return (
    <div className="relative w-full">
      <HiChevronDown
        size={20}
        className="text-primary cursor-pointer absolute h-full right-4"
      />
      <select
        className={classNames(
          "styled-select text-gray-200 bg-transparent cursor-pointer border border-primary focus:outline-none text-gray-900 rounded-lg block w-full h-12 px-2.5",
          className
        )}
        {...register?.(name)}
        {...rest}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

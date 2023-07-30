import { BsChevronRight } from "react-icons/bs";
import React from "react";

interface BreadCrumbProps {
  values: string[];
}

export function Breadcrumbs({ values }: BreadCrumbProps) {
  return (
    <div className="my-8 font-semibold sm:text-base text-gray-400">
      <div className="flex flex-row gap-1">
        <span className="font-bold">Você está em:</span>{" "}
        {values.map((item, index) => (
          <div className="flex flex-row items-center" key={item}>
            <span>{item}</span>
            <BsChevronRight
              className={values.length - 1 === index ? "hidden" : ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

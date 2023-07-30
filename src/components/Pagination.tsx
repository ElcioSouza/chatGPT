import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number | null) => {
    router.replace({
      query: { ...router.query, page: newPage },
    });

    if (newPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex flex-row items-center justify-end gap-3 pt-5  mt-auto">
      {currentPage > 1 && (
        <FaArrowLeft
          onClick={() => handlePageChange(currentPage - 1)}
          className="cursor-pointer"
        />
      )}
      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const half = Math.floor(5 / 2);
        const start = Math.max(currentPage - half, 1);
        const end = Math.min(start + 4, totalPages);
        return start + i <= end ? start + i : null;
      })
        .filter((page) => page !== null)
        .map((page) => (
          <button
            className={classNames(
              currentPage === page ? "text-primary" : "text-black",
              "font-semibold"
            )}
            key={page}
            disabled={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      {currentPage < totalPages && (
        <FaArrowRight
          className="cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
        />
      )}
    </div>
  );
}

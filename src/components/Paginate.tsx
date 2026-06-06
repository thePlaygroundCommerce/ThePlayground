'use client'

import { PaginateProps } from "index";
import React from "react";

import { MdChevronRight as RightIcon } from "react-icons/md";
import { MdChevronLeft as LeftIcon } from "react-icons/md";
import Button from "./Button";
import Link from "next/link";
import clsx from "clsx";

export const Paginate = ({
  page,
  max: numberOfPages,
  previousIcon = <LeftIcon size={24} />,
  nextIcon = <RightIcon size={24} />,
}: PaginateProps) => {
  const [_, setJumpedPage] = React.useState(null)
  const handlePageClick = (i: number) => {
    if (typeof i != "number") Number.parseInt(i);
    let newPage = i;
    if (i > numberOfPages) {
      newPage = numberOfPages;
    } else if (i <= 0) {
      newPage = 0;
    }
    // onPageChange(newPage);
    setJumpedPage(null);
  };
  const shouldRender = (idx: number) => (
    idx == page ||
    Math.abs(idx - page) <= 1 ||
    idx === numberOfPages - 1 ||
    idx === 0
  )

  const isBackDisabled = numberOfPages === 0 || page <= 1
  const isNextDisabled = numberOfPages === 0 || page === numberOfPages

  return (
    <div className="flex gap-4 items-center">
      <Link
        href={"?page=" + (page - 1)}
        tabIndex={isBackDisabled ? -1 : undefined}
        aria-label="previous"
        aria-disabled={isBackDisabled}
        className={clsx(isBackDisabled && "pointer-events-none cursor-default text-gray-300")}
      >
        {previousIcon}
      </Link>
      <div className="flex gap-6">
        {Array(numberOfPages)
          .fill(0)
          .map((_, i) => (
            <Link
            href={"?page=" + (i + 1)}
            className="border rounded-xl p-3"
              key={i}
            >
              {i + 1}
            </Link>
          ))
        }
      </div>
      <Link
        href={"?page=" + (page + 1)}
        tabIndex={isNextDisabled ? -1 : undefined}
        aria-label="next"
        aria-disabled={isNextDisabled}
        className={clsx(isNextDisabled && "pointer-events-none cursor-default text-gray-300")}
      >
        {nextIcon}
      </Link>
    </div>
  );
};

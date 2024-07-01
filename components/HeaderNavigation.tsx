"use client";
import React from "react";
import Link from "next/link";
import { Nav } from "app/layout";
import { AppProps } from "types";

type Props = AppProps & { navs: Nav[] };

const HeaderNavigation = ({ navs }: Props) => {
  return (
    <nav>
      <ul className="flex whitespace-nowrap">
        {navs.map(({ data: { title, link } }: Nav) => (
          <li key={title} className="text-black w-full">
            <Link className="px-4 py-2 md:px-4 md:py-2 block w-full" href={link ?? ""}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default HeaderNavigation;

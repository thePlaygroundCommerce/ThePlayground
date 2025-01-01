import Link from "next/link";
import React, { Fragment } from "react";
import { AppProps } from "index";

type Props = AppProps & {
  items?: {
    name: string
    link: string
  }[];
};

const Breadcrumbs = ({ items }: Props) => {

  return (
    <div>
      {items?.map(({ name, link }, i) => (
        <Fragment key={name}>
          <Link href={link}>
            {name.toUpperCase()}
          </Link>{" "}
          {i < items.length - 1 && " > "}
        </Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;

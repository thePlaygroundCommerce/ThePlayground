import React from "react";
import { AppProps } from "index";

type Props = {
  number: number | bigint;
} & AppProps;

const Money = ({ number, ...rest }: Props) => (
  <p {...rest}>
    {new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(number) / 100)}
  </p>
);

export default Money;

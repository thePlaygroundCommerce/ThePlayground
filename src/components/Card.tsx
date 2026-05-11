import clsx from "clsx";
import { AppProps } from "index";
import { ReactNode } from "react";

type CardProps = AppProps

const Card = ({
  children,
  className,
}: CardProps) => {
  return (
    <article
      className={clsx(
        "overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm",
        className,
      )}
    >
      {children}
    </article>
  );
};

export type { CardProps };
export default Card;

"use client";

import clsx from "clsx";
import { AppProps } from "index";
import { ReactNode } from "react";

type ShowcaseProps = {
  id?: number
  content: ReactNode
  text: ReactNode
  cta: ReactNode
  reverse: boolean
};

const Showcase = ({
  id = 0,
  ...rest
}: ShowcaseProps): JSX.Element => {
  const ShowcaseComponent = showcases[id];

  return <ShowcaseComponent {...rest} />
};

export default Showcase;

const Compact = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="w-full h-screen flex justify-center md:justify-end items-center">
    <div className="h-3/4 w-3/4 overflow-hidden rounded-lg border-2">
      {children}
    </div>
  </div>
);
const Window = ({ children, makeFirst }: AppProps & { makeFirst: boolean }) => (
  <div className="h-full w-full p-48">{children}</div>
);
const Showcase1 = ({ text, content, cta, reverse }: Omit<ShowcaseProps, 'id'>) => (
  <div className={clsx("min-h-[25vh] flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 lg:items-center", reverse && "lg:order-first")}>
    {content && <div className="flex-1 overflow-hidden aspect-square md:m-8">{content}</div>}
    <div className={clsx("flex-1", reverse && "md:order-first")}>
      {text && <div className="flex-1">{text}</div>}
      {cta && <div className="flex-1 w-full">{cta}</div>}
    </div>
  </div>
);
const List = ({ children, key }: AppProps) => (
  <ul className="m-4 list-disc" key={key}>
    {children}
  </ul>
);
const ListItem = ({ children, key }: AppProps) => (
  <li className="" key={key}>
    {children}
  </li>
);
const Showcase2 = ({ text, content, reverse }: Omit<ShowcaseProps, 'id'>) => (
  <div className={clsx(
    "flex flex-col justify-center items-center "
  )}>
    {/* <div className="aspect-square w-full m-12 rounded-4xl overflow-hidden">
      {children}
    </div> */}
  </div>
);
const Showcase3 = ({ text, content, cta, reverse }: Omit<ShowcaseProps, 'id'>) => {

  return (
    <div className={clsx("min-h-[25vh] flex flex-col gap-4 lg:gap-8 lg:items-center", reverse && "lg:order-first")}>
      {text && <div className="flex-1">{text}</div>}
      <div className="flex-1">
        {content && <div className="flex-1 lg:flex-none">{content}</div>}
        {cta && <div className="flex-1 w-full">{cta}</div>}
      </div>
    </div>
  )
}

const showcases = [
  Showcase1,
  Showcase2,
  Showcase3,
]
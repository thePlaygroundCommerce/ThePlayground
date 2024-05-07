import React from "react";
import Image from "next/image";

type Props = { height: number; width: number };

const LogoComponent = ({ height = 25, width = 25 , ...rest }: Props) => {
  return (
    <Image
      src="/The Playground Logo_Black.svg"
      alt="The Playground Logo"
      className="h-full w-16 md:w-20"
      height={height}
      width={width}
    />
  );
};

export default LogoComponent;

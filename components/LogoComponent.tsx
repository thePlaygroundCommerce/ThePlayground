import React from "react";
import Image from "next/image";
import { createClient } from "prismicio";

type Props = { height?: number; width?: number };

const LogoComponent = async ({ height = 25, width = 25, ...rest }: Props) => {
  const { results: [{ data: { image: { dimensions, alt, url } } }] } = await createClient().getByType("the_playground_display_logo");

  return (
    <div className="max-w-40 w-96 h-full overflow-hidden relative">
      <Image
        src={url ?? ""}
        alt={alt ?? "The Playground Logo"}
        objectFit="contain"
        fill
        className="w-full h-full"
      // height={dimensions?.height ?? height}
      // width={dimensions?.height ?? width}
      />
    </div>
  );
};

export default LogoComponent;

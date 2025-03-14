import React from "react";
import { createClient } from "prismicio";
import Image from 'components/Image'
import clsx from "clsx";
import { AppProps } from "index";

const LogoComponent = async ({ className }: AppProps) => {
  const { results: [{ data: { image: { alt, url } } }] } = await createClient().getByType("the_playground_display_logo");

  return (
    <div className={clsx(className, "overflow-hidden relative")}>
      <Image
        src={url ?? ""}
        alt={alt ?? "The Playground Logo"}
        style={{ objectFit: 'contain' }}
        width={200}
        height={200}
      />
    </div>
  );
};

export const renderLogo = () => <LogoComponent />

export default LogoComponent;

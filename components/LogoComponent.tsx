import React from "react";
import { createClient } from "prismicio";
import Image from 'components/Image'
import clsx from "clsx";
import { AppProps } from "index";

const LogoComponent = async ({ className }: AppProps) => {
  const { results: [{ data: { image: { alt, url } } }] } = await createClient().getByType("the_playground_display_logo");

  return (
    <Image
      src={url ?? ""}
      alt={alt ?? "The Playground Logo"}
      width={1080}
      height={1080}
      className="w-44"
    />  
  );
};

export const renderLogo = (props?: AppProps) => <LogoComponent {...props}/>

export default LogoComponent;

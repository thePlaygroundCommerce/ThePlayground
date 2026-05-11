import React from "react";
import { client } from "@/api/clients/";
import Image from '@/components/Image'
import { AppProps } from "index";

const LogoComponent = async ({ className }: AppProps) => {
  // const { results: [{ data: { image: { alt, url } } }] } = await client.getByType("the_playground_display_logo");

  return (
    <Image
      // src={""}
      alt={"The Playground Logo"}
      width={1080}
      height={1080}
      className="w-44"
    />  
  );
};

export const renderLogo = (props?: AppProps) => <LogoComponent {...props}/>

export default LogoComponent;

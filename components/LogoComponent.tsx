import React from "react";
import { createClient } from "prismicio";
import Image from 'components/Image'

const LogoComponent = async () => {
  const { results: [{ data: { image: { alt, url } } }] } = await createClient().getByType("the_playground_display_logo");

  return (
    <div className="max-w-40 w-96 h-full overflow-hidden relative">
      <Image
        src={url ?? ""}
        alt={alt ?? "The Playground Logo"}
        style={{ objectFit: 'contain'}}
        fill
        className="w-full h-full"
      />
    </div>
  );
};

export default LogoComponent;

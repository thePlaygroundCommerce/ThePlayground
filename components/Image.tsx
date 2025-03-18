import NextImage from "next/image"
import { ImageProps } from "index";
import React from "react";
import clsx from "clsx";

const Image = ({ src = "https://picsum.photos/1080" , className, objectFit, ...rest }: ImageProps) => {
    if(!(rest.width && rest.height))  rest.fill = true
    return <NextImage className={clsx(objectFit && `object-${objectFit}`, className)}  {...{...rest, src: src ?? "https://picsum.photos/1080"}} />
}

export default Image
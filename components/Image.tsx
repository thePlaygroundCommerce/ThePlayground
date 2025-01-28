import NextImage, { ImageLoaderProps } from "next/image"
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import React from "react";
import clsx from "clsx";

const Image = ({ src = "https://picsum.photos/1080" , className, objectFit, ...rest }: ImageProps) => {
    return <NextImage className={clsx("w-full max-w-full max-h-full", objectFit && `object-${objectFit}`, className)}  {...{...rest, src: src ?? "https://picsum.photos/1080"}} />
}

export default Image
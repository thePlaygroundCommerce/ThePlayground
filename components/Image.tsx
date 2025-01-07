import NextImage, { ImageLoaderProps } from "next/image"
import { ImageProps } from "next/dist/shared/lib/get-img-props";
import React from "react";
import clsx from "clsx";


const Image = ({ className, objectFit, ...rest }: ImageProps) => {
    return <NextImage className={clsx("w-full max-w-full max-h-full", objectFit && `object-${objectFit}`, className)} {...rest} />
}

export default Image
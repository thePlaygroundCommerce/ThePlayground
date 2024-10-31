import NextImage, { ImageLoaderProps } from "next/image"
import { PlaceholderValue, OnLoadingComplete, StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";
import clsx from "clsx";


type Props = Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & {
    src: string | StaticImport;
    className: string;
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    fill?: boolean | undefined;
    loader?: (p: ImageLoaderProps) => string;
    quality?: number | `${number}` | undefined;
    priority?: boolean | undefined;
    loading?: "eager" | "lazy" | undefined;
    placeholder?: PlaceholderValue | undefined;
    blurDataURL?: string | undefined;
    unoptimized?: boolean | undefined;
    overrideSrc?: string | undefined;
    onLoadingComplete?: OnLoadingComplete | undefined;
    layout?: string | undefined;
    objectFit?: string | undefined;
    objectPosition?: string | undefined;
    lazyBoundary?: string | undefined;
    lazyRoot?: string | undefined;
} & React.RefAttributes<HTMLImageElement | null>;

const Image = ({ className, ...rest }: Props) => {
    return <NextImage className={clsx("w-full max-w-full max-h-full", className)} {...rest} />
}

export default Image
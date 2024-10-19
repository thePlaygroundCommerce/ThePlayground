import { AppProps } from "types"
import NextImage, { ImageLoaderProps } from "next/image"
import { PlaceholderValue, OnLoadingComplete, StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";


type Props = React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "height" | "width" | "loading" | "ref" | "alt" | "src" | "srcSet"> & {
    src: string | StaticImport;
    alt: string;
    width?: number | `${number}` | undefined;
    height?: number | `${number}` | undefined;
    fill?: boolean | undefined;
    loader?: (p: ImageLoaderProps) => string | undefined;
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
} & React.RefAttributes<HTMLImageElement | null>>;

const Image = ({ ...rest }: Props) => {
    return (
        <div className="-z-10 w-full h-full absolute rounded-lg">
            <NextImage {...rest} />
        </div>
    )
}

export default Image
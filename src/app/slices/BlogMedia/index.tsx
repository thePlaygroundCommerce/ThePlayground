import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import image from "next/image";
import { group } from "console";
import { Simplify } from "prismicio-types";

/**
 * Props for `BlogMedia`.
 */
export type BlogMediaProps = SliceComponentProps<Content.BlogMediaSlice>;

/**
 * Component for "BlogMedia" Slices.
 */
const BlogMedia: FC<BlogMediaProps> = ({ slice }) => {

  let disableStyle;

  const content = isFilled.group<Simplify<Content.BlogMediaSliceDefaultPrimaryGroupItem>>(slice.primary.group) && slice.primary.group.map(({ embed, image }) => {
    const img = isFilled.image(image) && <PrismicNextImage key={image.id} field={image} alt="" />
    const vid = isFilled.embed(embed) && (
      <div key={embed.embed_url} style={{ position: "relative", paddingTop: "56.25%" }} className="h-full">
        <iframe src={embed.embed_url} loading="lazy" style={{ border: 0, position: "absolute", top: 0, height: "100%", width: "100%" }} allow="accelerometer; gyroscope; autoplay; encrypted- media;picture-in-picture;fullscreen;" allowFullScreen />
      </div>
    )
    if(!img) disableStyle = true

    return img || vid

  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={!disableStyle && "flex justify-center"}
    >
      {content}
    </section>
  );
};

export default BlogMedia;

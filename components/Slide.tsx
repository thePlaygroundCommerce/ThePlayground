import React from "react";
import Money from "./Money";
import Image from "./Image";
import { Content, isImageProps, renderContentImage } from "./Hero";

export const Slide = ({ type, ...rest }: SlideProps) => {
    const Component = sliderTypeMap[type];
    return (
        <div className="relative">
            <Component {...rest} />
        </div>
    );
};

export type TypeOmittedSlideProps = Omit<SlideProps, 'type'>

export const IconSlideContent = ({
    content: { title, price, headline },
}: TypeOmittedSlideProps) => {

    return (
        <div className="p-6 grid grid-cols-1 grid-row-12 overflow-hidden">
            {/* <div className="window-header">
            </div> */}
            <div className="window-body rounded">
                <div className="-z-10 relative h-full rounded-lg overflow-hidden aspect-square">
                    <p>icon</p>
                </div>
            </div>
            <div className="window-footer flex flex-col gap-4 mt-4 row-span-1">
                {/* <PrismicRichText field={name} /> */}
                <div>
                    <p className="font-black">{title}</p>
                    {price && <Money number={price} />}
                </div>
                {headline && <p>{headline}</p>}
                {/* {link && <Link href={link}><Button>READ NOW</Button></Link>} */}
                {/* {isFilled.link(call_to_action) && (
            <div>
              <Button>Learn More</Button>
            </div>
          )} */}
            </div>
        </div>
    );
};

export const ProductSlideContent = ({
    image,
    content: { title, price, headline },
}: TypeOmittedSlideProps) => {
    const ImageComponent = isImageProps(image) ? (
        <Image
            {...{
                ...image,
                src: image.src,
                className: `h-full object-${image.objectFit}`,
                fill: true,
            }}
        />
    ) : (
        image
    );

    return (
        <div className="p-6 grid grid-cols-1 grid-row-12 overflow-hidden">
            {/* <div className="window-header">
            </div> */}
            <div className="window-body rounded">
                <div className="-z-10 relative h-full rounded-lg overflow-hidden aspect-square">
                    {ImageComponent}
                </div>
            </div>
            <div className="window-footer flex flex-col gap-4 mt-4 row-span-1">
                {/* <PrismicRichText field={name} /> */}
                <div>
                    <p className="font-black">{title}</p>
                    {price && <Money number={price} />}
                </div>
                {headline && <p>{headline}</p>}
                {/* {link && <Link href={link}><Button>READ NOW</Button></Link>} */}
                {/* {isFilled.link(call_to_action) && (
            <div>
              <Button>Learn More</Button>
            </div>
          )} */}
            </div>
        </div>
    );
};

const sliderTypeMap = {
    DEFAULT: ProductSlideContent,
    ICONS: IconSlideContent,
    BLOG: () => <div></div>
}

export interface SlideProps {
    type: keyof typeof sliderTypeMap
    image: Content["image"];
    content: Content["content"] & {
        price?: number;
        link?: string;
    };
}

export default Slide;

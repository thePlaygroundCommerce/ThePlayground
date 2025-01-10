import Money from "./Money";
import Image from "./Image";
import { Content, isImageProps, renderContentImage } from "./Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faStar,
    faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import Heading from "./typography/Heading";
import { wrapLink } from "util/index";
import { CtaEmailDocumentData } from "prismicio-types";
import Button from "./Button";
import clsx from "clsx";
import Transition from "app/Transition";

export const Slide = ({ type, ...rest }: SlideProps) => {
    const Component = sliderTypeMap[type];
    return <Component {...{ ...rest }} />
};

export type TypeOmittedSlideProps = Omit<SlideProps, "type">;

export const IconSlideContent = ({
    animate = false,
    content: { icon: _icon = "SHIP", headline, title, description, cta },
}: TypeOmittedSlideProps & { animate?: boolean }) => {
    const icon = iconTypeMap[_icon] ?? faTruckFast;

    return (
        <div className={"p-4"}>
            <div className="border border-zinc-300 rounded-lg p-4 bg-zinc-100 drop-shadow-md">
                <div className="bg-gray-200 max-w-36 aspect-square rounded-full mx-auto mb-2 flex justify-center items-center shadow-md">
                    <FontAwesomeIcon size="2x" icon={icon} />
                </div>
                <div className="window-footer flex flex-col gap-4 mt-4 row-span-1 text-center">
                    <Heading level={4}>{title}</Heading>
                    {headline && <p className="italic">{headline}</p>}
                    {description && <p className="font-black">{description}</p>}
                    {cta?.url && wrapLink(cta.url, <Button>{cta.button_label}</Button>)}
                </div>
            </div>
        </div>

    )
}


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

const iconTypeMap = {
    SHIP: faTruckFast,
    CHECK: faCheck,
    STAR: faStar,
};
const sliderTypeMap = {
    DEFAULT: ProductSlideContent,
    ICONS: IconSlideContent,
    BLOG: () => <div></div>,
};

export interface SlideProps {
    type: keyof typeof sliderTypeMap;
    image: Content["image"];
    content: Content["content"] & {
        icon?: keyof typeof iconTypeMap;
        price?: number;
        link?: string;
    };
}

export default Slide;

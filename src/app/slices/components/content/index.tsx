
import { WebflowSlider as Slider } from "@/components/Slider";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { Hero2SliceVariation, Simplify } from "prismicio-types";
import { ComponentProps } from "react";
import Card from "./CardContent";

export { default as TextContent } from "./TextContent"
export { default as CtaContent } from "./CtaContent"
export { default as CardContent } from "./CardContent"


export const renderContent = (contentType: Hero2SliceVariation['primary']['content'], content: Simplify<Content.Hero2SliceDefaultPrimary> | Simplify<Content.Hero2SliceStyle2Primary> | Simplify<Content.Hero2SliceStyle3Primary>) => {
    const createImage = (props: ComponentProps<typeof PrismicNextImage>) => <PrismicNextImage {...props} className="h-full w-full object-cover" />

    switch (contentType) {
        case "image":
            return isFilled.image(content.image) && createImage({ field: content.image, className: "object-contain w-full h-full" });
        case "card":
            return (
                <>
                    <div className="flex gap-8 md:hidden">
                        <Slider visibleItemsCount={1} isInfinite={false} withIndicator={false} withControls={false}>
                            {content.cards.map(({ title, headline, description, image, type }, i) => {
                                const ImageComponent = isFilled.image(image) ? createImage({ field: image }) : undefined
                                return (
                                    <div className="px-2 h-full">
                                        <Card type={type} key={`${title}${i}`} image={ImageComponent} title={title} headline={headline} description={description} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    <div className="md:flex gap-8 hidden">
                        <Slider visibleItemsCount={1} isInfinite={false} withIndicator={false} withControls={false}>
                            <div className="px-2 h-full flex gap-8">
                                {content.cards.map(({ title, headline, description, image, type }, i) => {
                                    const ImageComponent = isFilled.image(image) ? createImage({ field: image }) : undefined
                                    return (
                                        <Card type={type} key={`${title}${i}`} image={ImageComponent} title={title} headline={headline} description={description} />
                                    )
                                })}
                            </div>
                        </Slider>
                    </div>
                </>
            )

    }
}

import React, { ReactElement } from "react";
import Heading from "./typography/Heading";
import Link from "next/link";
import Slide, { SlideProps, TypeOmittedSlideProps } from "components/Slide";
import { Content } from "./Hero";
import { wrapLink } from "util/index";

type Props = {
    type: SlideProps['type']
    title: NonNullable<Content["content"]>["title"];
    headline: NonNullable<Content["content"]>["headline"];
    slides: TypeOmittedSlideProps[];
};

const Slider = ({ type, title, headline, slides }: Props) => {
    console.log(slides)
    return (
        <div>
            <div className="text-center container mx-auto">
                <Heading>{title}</Heading>
                <p className="my-4">{headline}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-center min-h-96">
                {slides.map((slide, i) => (
                    <div key={i} className="basis-full md:basis-1/4 md:shrink">
                        {wrapLink(
                            slide.content.link,
                            <Slide
                                {...{

                                    type,
                                    ...slide
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;

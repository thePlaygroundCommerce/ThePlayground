import React from 'react'
import Money from './Money';
import Image from './Image';

export const Window = ({
    ...rest
}: WindowProps) => {
    return (
        <div className="relative min-h-96">
            <WindowContent {...rest} />
        </div>
    );
}

export const WindowContent = ({ imageData, contentData: { title, price, headline, link } }: WindowProps) => {
    const { imagefit = "" } = imageData
    return (
        <div className="p-6 grid grid-cols-1">
            <div className="window-header">
            </div>
            <div className="window-body w-full rounded">
                <div className="-z-10 w-full relative rounded-lg overflow-hidden aspect-square">
                    <Image {...{ ...imageData, src: imageData.url, className: `object-${imagefit}`, fill: true }} />
                </div>
            </div>
            <div className="window-footer flex flex-col gap-4 mt-4">
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
    )
}

export interface WindowProps {
    imageData: {
        imagefit: 'cover' | 'contain'
        alt: string
        url: string
    }
    contentData: {
        title?: string,
        headline?: string
        price?: number
        link: string
    }
}

export default Window
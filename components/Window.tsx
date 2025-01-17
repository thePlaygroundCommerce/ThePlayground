import React from 'react'
import Money from './Money';
import Image from './Image';

export const Window = ({
    ...rest
}: WindowProps) => {
    return (
        <div className="relative">
            <WindowContent {...rest} />
        </div>
    );
}

export const WindowContent = ({ imageData, contentData: { title, price, headline } }: WindowProps) => {
    const { imagefit = "" } = imageData
    return (
        <div className="p-6 grid grid-cols-1 grid-row-12 overflow-hidden">
            {/* <div className="window-header">
            </div> */}
            <div className="window-body rounded">
                <div className="-z-10 relative h-full rounded-lg overflow-hidden aspect-square">
                    <Image {...{ ...imageData, src: imageData.url, className: `h-full object-${imagefit}`, fill: true }} />
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
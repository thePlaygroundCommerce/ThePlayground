import React, { ReactNode } from 'react'
import { Content, ContentImage, isImageProps } from './Hero'
import Image from './Image'
import Heading from './typography/Heading'

type Props = {
    gridItems: (ContentImage | Content['content'])[]
}

const PhotoGrid = ({ gridItems }: Props) => {

    return (
        <div className='grid md:grid-cols-2 md:grid-rows-2'>
            {gridItems.map((gridItem, i) => {
                let item: ReactNode;
                if (!gridItem) return null;

                const renderImage = (image: ContentImage) => isImageProps(image) ? <Image {...image} /> : image
                const renderContent = ({ title, description }: NonNullable<Content['content']>) => (
                    <div className='p-4'>
                        {typeof title === 'string' ? <Heading>{title}</Heading> : title}
                        {typeof description === 'string' ? <p>{description}</p> : description}
                    </div>
                )

                if ('description' in gridItem) {
                    item = renderContent(gridItem)
                }
                else if (!('title' in gridItem)) {
                    item = renderImage(gridItem)
                }

                return (
                    <div key={i}>{item}</div>
                )
            })}
        </div>
    )
}

export default PhotoGrid
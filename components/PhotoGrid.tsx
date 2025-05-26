import React, { ReactNode } from 'react'
import { isImageProps } from './Hero'
import Image from './Image'
import Heading from './typography/Heading'
import { ContentData, ContentImage } from 'index'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa6'
import clsx from 'clsx'

type Props = {
    gridItems: (ContentImage | ContentData)[]
}

const PhotoGrid = ({ gridItems }: Props) => {
    const articles = gridItems.map((x, i) => <Item {...x} key={i} className={clsx((i === 3 || i === 6) && "row-span-2 md:row-auto md:col-span-2 overflow-hidden max-h-full", !(i === 3 || i === 6) && "aspect-square")} />)

    return (
        <div id="" className="h-full">
            <div className='grid md:grid-cols-3 grid-cols-1 auto-rows-fr'>
                {articles}
            </div>
        </div>

    )

}

const Item = ({ title, className, description }: any) => (
    <div className={clsx("text-white w-full relative shadow-[inset_0px_-75px_68px_-34px_rgba(0,0,0,0.50)]", className)}>
        <Link href={'#'} className=''>
            <div className='relative h-full'>
                <Image width={1080} height={1080}
                    alt={""}
                    className="absolute top-0 left-0 h-full md:h-auto object-cover -z-10"
                />
            </div>
            <div className="absolute bottom-0 p-4 w-full flex items-center gap-4 text-white">
                <div className={clsx(description && 'w-full')}>
                    <h5 className='font-semibold'>{title ?? "Real Estate Videography"}</h5>
                    <p className='text-sm line-clamp-2'>{description}</p>
                    {description && <p className="font-light text-zinc-200 text-xs underline">Read More</p>}
                </div>
                {!description && <FaArrowRight />}
            </div>
        </Link>
    </div>
)

const ItemB = () => (
    <article className="w-full h-auto">
        <Link href="#" className="">
            <div className='relative text-white'>
                <Image className='object-contain' width={1080} height={1080} alt="" />
                <div className="absolute bottom-0 left-0 z-10 p-4">
                    <h5 className=''>Magna feugiat lorem</h5>
                    <p className='text-sm'>Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.</p>
                </div>
            </div>
        </Link>
    </article>
)
// const A = () => {
//     return (
//         <>
//             <div className="aspect-square w-full relative shadow-[inset_0px_-75px_68px_-34px_rgba(0,0,0,0.50)]">
//                 <Image width={1080} height={1080}
//                     alt={""}
//                     className="relative -z-10"
//                 />
//                 <div className="absolute bottom-0 p-4 flex items-center gap-4">
//                     <p>Real Estate Videography</p>
//                     <FaArrowRight />
//                 </div>
//             </div>
//             <div className="aspect-square w-full relative shadow-[inset_0px_-75px_68px_-34px_rgba(0,0,0,0.50)]">
//                 <Image width={1080} height={1080}
//                     alt={""}
//                     className="relative -z-10"
//                 />
//                 <div className="absolute bottom-0 p-4 flex items-center gap-4">
//                     <p>Content Creation</p>
//                     <FaArrowRight />
//                 </div>
//             </div>
//             <div className="aspect-square w-full relative shadow-[inset_0px_-75px_68px_-34px_rgba(0,0,0,0.50)]">
//                 <Image width={1080} height={1080}
//                     alt={""}
//                     className="relative -z-10"
//                 />
//                 <div className="absolute bottom-0 p-4 flex items-center gap-4">
//                     <p>Commercial Videography</p>
//                     <FaArrowRight />
//                 </div>
//             </div>
//         </>
//     )
// }

export default PhotoGrid
import { Transition, } from "@headlessui/react"
import staticImages from "util/images.ts";
import clsx from "clsx"
import { useState, MouseEventHandler } from "react"
import Image from "./Image"
import Button from "./Button";

const title = "the new log"
const description = "Daily Inspiration, local adventures and awesome events."

const AnimatedCard = ({
    items = [
        {
            src: staticImages.q,
            title: title,
            description: description
        },
        {
            src: staticImages.e,
            title: title,
            description: description
        },
        {
            src: staticImages.c,
            title: title,
            description: description
        }
    ]
}) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [hideDetails, setHide] = useState(false)

    const handleToggle = () => setHide(!hideDetails)
    const images = items.map(({ src }, i) =>
        <Transition key={i} show={activeIndex === i} beforeEnter={handleToggle} afterEnter={handleToggle}>
            <Image
                style={{ zIndex: i }}
                src={src}
                loading="lazy"
                alt=""
                className={clsx([
                    "k-news-thumb row-start-1 col-start-1",
                    "transition-all duration-500",
                    // "data-enter:data-closed:translate-x-full data-leave:data-closed:-translate-x-full"
                    // Shared closed styles
                    'data-leave:opacity-0',
                    // Entering styles
                    'data-enter:data-closed:-translate-y-full',
                    // Leaving styles
                    'data-leave:data-closed:translate-y-full',
                ])}
            />
        </Transition>
    )

    const { title, description } = items[activeIndex];

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => { setActiveIndex(+e.currentTarget.value) }

    return (
        <div className="k-hero-card overflow-hidden" style={{ zIndex: 2 }}>
            <div className="flex flex-col gap-2 justify-center mr-2">
                {images.map((_, i) => (
                    <Button onClick={handleClick} value={i} padding={0} key={i} className={clsx("size-2 rounded-full cursor-pointer", activeIndex === i ? "bg-red-600" : "bg-white")} />
                ))}
            </div>
            <div className="grid grid-cols-1">
                {images}
            </div>
            <div className={clsx("k-news-details transition-opacity duration-300", hideDetails ? "opacity-0" : "opacity-100")}>
                <div className="k-news-heading">{title}</div>
                <div className="k-news-text">{description}</div>
            </div>
        </div>
    )
}

export default AnimatedCard
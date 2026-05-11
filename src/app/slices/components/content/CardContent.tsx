import BaseCard from "@/components/Card"
import clsx from "clsx"

type TypeOmitedContentProps = Omit<ContentProps, "type">
type ContentProps = {
    type?: keyof typeof map,
    image: any,
    title: any,
    description: any,
    headline: any,
}


const Card = ({ type = "image", ...rest }: ContentProps) => {
    const CardContent = map[type]

    const styleMap = {
        image: "h-full",
        step: "text-left h-full",
    }

    return (
        <BaseCard className={clsx(styleMap[type], "flex-1")}>
            <CardContent {...rest} />
        </BaseCard>
    )

}

export default Card



const Review = ({ image, headline, description, title }: TypeOmitedContentProps) => {
    return (
        <>
            {image && (
                <div className="relative h-48 md:h-56 lg:h-64 w-full">
                    {image}
                </div>
            )}

            <div className="space-y-2 p-3 md:p-4 lg:p-5">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-black">{title}</h3>
                <p className="text-xs md:text-xs lg:text-sm font-medium uppercase tracking-[0.18em] text-black/50">
                    {headline}
                </p>
                <p className="text-xs md:text-sm lg:text-base leading-relaxed text-black/70">{description}</p>
                <p className="text-xs md:text-sm lg:text-base leading-relaxed text-black/70">★★★★★</p>
            </div>
        </>
    )
}
const Testimonial = ({ image, headline, description, title }: TypeOmitedContentProps) => {
    return (
        <>
            {image && (
                <div className="relative h-64 md:h-72 lg:h-80 w-full p-3 md:p-4 lg:p-4">
                    {image}
                </div>
            )}

            <div className="space-y-2 p-3 md:p-4 lg:p-5 text-left">
                <p className="text-xs md:text-sm lg:text-base leading-relaxed text-black/70">{description}</p>
                <div className="text-right pt-6 md:pt-8 lg:pt-8">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/50">
                        {headline}
                    </p>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-black">{title}</h3>
                </div>
            </div>
        </>
    )
}
const Image = ({ image, headline, description, title }: TypeOmitedContentProps) => {
    return (
        <>
            {image && <div className="relative h-64 md:h-72 lg:h-80 w-full p-3 md:p-4 lg:p-4">
                {image}
            </div>}

            <div className="space-y-2 p-3 md:p-4 lg:p-5">
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight text-black">{title}</h3>

                <p className="text-xs md:text-xs lg:text-sm font-medium uppercase tracking-[0.18em] text-black/50">
                    {headline}
                </p>
                <p className="text-xs md:text-sm lg:text-base leading-relaxed text-black/70">{description}</p>
            </div>
        </>
    )
}

const map = {
    review: Review,
    step: Image,
    image: Testimonial,
}
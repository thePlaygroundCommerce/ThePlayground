import Heading from "@/components/typography/Heading";
import clsx from "clsx";
import { ContentData } from "index";
import { loremIpsum } from "lorem-ipsum";

const TextContent = (
    {
        headline,
        title,
        form,
        description,
    }: ContentData
) => {
    description =
        description ??
        loremIpsum({
            count: 4,
            units: "sentences",
        });
    return (
        <div
            className={clsx(
                "w-full duration-2000 delay-2000",
                "flex flex-col justify-start md:justify-center md:items-center md:h-full md:px-6 lg:px-8 p-8"
            )}
        >
            <div
                className={clsx(
                    "text-center text-black mb-4 md:mb-6 lg:mb-8 max-w-full md:max-w-2xl"
                )}
            >
                <div className="mb-2 w-full md:w-4/5 lg:w-full mx-auto">
                    {typeof title === "string" ? (
                        <Heading level={2}>
                            {title}
                        </Heading>
                    ) : (
                        title
                    )}
                </div>
                <p className="text-sm md:text-base lg:text-lg italic">{headline}</p>
                <div className="text-center text-base">
                    {typeof description === "string" ? (
                        <p>{description}</p>
                    ) : (
                        description
                    )}
                </div>
            </div>
            {form}
        </div>
    );
}

export default TextContent

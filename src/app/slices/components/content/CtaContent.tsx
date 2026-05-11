import Button from "@/components/Button";
import Link from "next/link";


const CtaContent = ({ linkLabel, link = undefined }) => (
    linkLabel && (
        <div className="w-full flex justify-center md:justify-start lg:justify-center px-4 md:px-6 lg:px-8">
            <Link href={link ?? ""}>
                <Button className="p-4 md:p-5 lg:p-6 rounded-2xl text-base md:text-lg lg:text-lg font-semibold block w-full md:w-auto" variant="primary">
                    {linkLabel}
                </Button>
            </Link>
        </div>
    )
)

export default CtaContent
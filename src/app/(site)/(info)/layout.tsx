import Link from 'next/link'

const layout = ({ children }: LayoutProps<"/">) => {
    const a = [
        {name: "Contact", link: "contact" },
        {name: "About", link: "about" },
        {name: "Work", link: "work" },
        {name: "T&Cs", link: "terms-and-conditions" },
    ]
    return (
        <div className='pt-6'>
            <div className='flex flex-col justify-center items-center'>
                {/* <Heading>tab</Heading> */}
                <nav>
                    {a.map((tab) => (
                        <Link key={tab.name} className='m-4' href={`/${tab.link}`}>{tab.name}</Link>
                    ))}
                </nav>
            </div>
            <div className='mt-8'>{children}</div>
        </div>
    )
}

export default layout
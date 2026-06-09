import ActiveNavLink from "@/components/ActiveNavLink";

const layout = ({ children }: LayoutProps<"/">) => {
    const links = [
        { name: "Contact", link: "contact" },
        { name: "About", link: "about" },
        { name: "Work", link: "work" },
        { name: "Returns", link: "returns" },
        { name: "T&Cs", link: "terms-and-conditions" },
    ];

    const style = "flex-1 px-4 py-2 rounded-full text-center mx-2"
    
    return (
        <div className="pt-6 md:max-w-5xl mx-auto">
            <div className="flex flex-col justify-center items-center">
                <nav className="flex">
                    {links.map((tab) => (
                        <ActiveNavLink
                            href={`/${tab.link}`}
                            key={tab.name}
                            className={style + " hover:bg-gray-300 hover:text-white"}
                            clx={style + " bg-black text-white hover:bg-black hover:text-white"}
                            pth={`/${tab.link}`}
                        >
                            {tab.name}
                        </ActiveNavLink>
                    ))}
                </nav>
            </div>
            <div className="mt-8">{children}</div>
        </div>
    );
};

export default layout;

import clsx from "clsx";
import { AppProps } from "index";
import { ReactNode } from "react";


const Layout = ({ children, header, footer }: AppProps & { header: ReactNode, footer: ReactNode }) => {



    return (
        <div className="h-screen flex flex-col">
            {header}
            <main className={clsx(" flex-1 min-h-0 overflow-auto", false && "col-start-1 row-start-2 overflow-x-hidden")}>
                {children}
                {footer}
            </main>
        </div>
    );

}

export {
    Layout
}
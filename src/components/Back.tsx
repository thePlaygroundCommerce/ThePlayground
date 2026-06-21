'use client'

import { AppProps } from "index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Back = ({ children, className, link }: AppProps & { link?: string }) => {
    const router = useRouter();
    return (
        <button
            type="button"
            onClick={() => link ? router.push(link) : router.back()}
            className={className}
        >
            {children}
        </button>
    );
}

export default Back
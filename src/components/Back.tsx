'use client'

import { AppProps } from "index";
import { useRouter } from "next/navigation";

const Back = ({ children, className }: AppProps) => {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={className}
        >
            {children}
        </button>
    );
}

export default Back
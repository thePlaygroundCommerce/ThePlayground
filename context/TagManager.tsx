"use client";
import _ from "lodash";
import React, {
    createContext,
    useMemo,
    useContext,
    useEffect,
    useState,
} from "react";

type OrUndefined<T> = T | undefined;

export const TagManager = createContext<{
    track: (title: string, data?: {
        content_ids?: string[]
        content_name?: string | null
        content_type?: string
        content_category?: string | null
        currency?: string | null
        value?: number | bigint | null
        num_items?: number | null
    }) => void
} | null>(null);

const TagManagerProvider = ({
    children,
}: {
    children: any;
}) => {
    if (typeof window === 'undefined' || !window) return children;

    const [initialized, setInit] = useState(false);
    useEffect(() => {
        setInit(true);
    }, [])
    const fbq = window.fbq
    const verifyInit = () => {
        if (!initialized) {
            console.warn(
                'Pixel not initialized before using call ReactPixel.init with required params',
            );
        }
        return initialized;
    };

    const track = (title: string, data: {}) => {
        if (!verifyInit()) return;

        fbq('track', title, data)
    }

    return (
        <TagManager.Provider
            //@ts-ignore
            value={useMemo(
                () => ({
                    track
                }),
                []
            )}
        >
            {children}
        </TagManager.Provider>
    );
};

export const useTracking = () => {
    const currentTrack = useContext(TagManager);
    if (!currentTrack) {
        throw new Error("Hooks have to be used within Providers");
    }

    return currentTrack;
};

export default TagManagerProvider;

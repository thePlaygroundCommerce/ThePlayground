"use client"

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import { AppProps } from 'index';

type Props = {
    rootId: string;
} & AppProps

const Portal = ({ rootId, children }: Props) => {
    const target = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (target.current) {

            let container = document.getElementById(rootId);
            if (!container) {
                container = document.createElement("div");
                container.setAttribute("id", rootId);
                document.body.appendChild(container);
            }

            container.appendChild(target.current);

            return () => {
                if (target.current) {
                    target.current.remove();
                    if (container.childNodes.length === 0) {
                        container.remove();
                    }
                }
            };
        } else {
            target.current = document.createElement("div");
        }
    }, [rootId]);


    return target.current ? createPortal(children, target.current) : null ;

}

export default Portal
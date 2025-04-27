"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom';
import { AppProps } from 'index';

type Props = {
    rootId: string;
} & AppProps

const Portal = ({ rootId, children }: Props) => {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        let container = document.getElementById(rootId);
        
        // console.log(container, rootId, children, rootId !== "" && container ? true : false)
        if (!container) {
            return
            // container = document.createElement("div");
            // container.setAttribute("id", rootId);
            // document.body.appendChild(container);
        }

        setContainer(container)

        // container.appendChild(target.current);

        return () => {
            if (container.childNodes.length > 0) {
                container.childNodes.forEach(node => node.remove())
            }
        };
    }, [rootId]);

    return rootId !== "" && container ? createPortal(children, container) : null;

}

export default Portal
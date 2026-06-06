import { latoHeavy, latoBlack } from '@/app/fonts'
import clsx from 'clsx'
import { createElement, HTMLAttributes } from 'react'

type A = {
    element: string
    classes?: string
}

const ComponentMap: { [id: number]: A } = {
    1: { element: "h1", classes: clsx(latoBlack.className, "text-4xl") },
    2: { element: "h2", classes: clsx(latoBlack.className, "text-2xl") },
    3: { element: "h3", classes: clsx(latoHeavy.className, "text-xl" ) },
    4: { element: "h4", },
    5: { element: "h4", },
    6: { element: "h4", }
}

const Heading = ({ children, className, level = 3, ...rest }: HTMLAttributes<HTMLElement> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }) => {
    const { element, classes } = ComponentMap[level];
    return createElement(element, {
        ...rest,
        className: clsx(classes, className)
    }, children)
}
export default Heading
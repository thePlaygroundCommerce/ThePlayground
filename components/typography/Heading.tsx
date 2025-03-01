import { latoHeavy, latoBlack } from 'app/fonts'
import clsx from 'clsx'
import { AppProps } from 'index'
import { createElement } from 'react'

type A = {
    element: string
    classes?: string
}

const ComponentMap: { [id: number]: A } = {
    1: { element: "h1", classes: clsx(latoBlack.className, "text-4xl") },
    2: { element: "h2", classes: clsx(latoHeavy.className   ) },
    3: { element: "h3", },
    4: { element: "h4", },
    5: { element: "h4", },
    6: { element: "h4", }
}

const Heading = ({ children, className, level = 3, ...rest }: AppProps & { level?: 3 | 1 | 2 | 4 | 5 | 6 }) => {
    const { element, classes } = ComponentMap[level];
    return createElement(element, {
        ...rest,
        className: clsx(classes, className)
    }, children)
}
export default Heading
import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'
import { AppProps } from 'index'
import { createElement } from 'react'

const ComponentMap: { [id: number]: string } = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h4",
    6: "h4"
}

const Heading = ({ children, className, level = 3, ...rest }: AppProps & { level?: 3 | 1 | 2 | 4 | 5 | 6 }) => {
    const heading = ComponentMap[level];
    return createElement(heading, {
        ...rest,
        className: clsx(latoHeavy.className, className)
    }, children)
}
export default Heading
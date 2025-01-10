import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'
import { AppProps } from 'index'
import { Heading as HeadingComponent } from 'rsuite'

const Heading = ({ children, className, level = 3, ...rest }: AppProps & { level?: 3 | 1 | 2 | 4 | 5 | 6 }) => {
    return (
        <HeadingComponent level={level} {...rest} className={clsx(latoHeavy.className, className)}>{children}</HeadingComponent>
    )
}
export default Heading
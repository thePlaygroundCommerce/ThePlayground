import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'
import { Heading as HeadingComponent } from 'rsuite'

const Heading = ({ children, className, level = 3, ...rest }: any) => {
    return (
        <HeadingComponent level={level} {...rest} className={clsx(latoHeavy.className, className)}>{children}</HeadingComponent>
    )
}
export default Heading
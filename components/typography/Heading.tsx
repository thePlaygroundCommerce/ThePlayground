import { lato900 } from 'app/fonts'
import clsx from 'clsx'
import { Heading as HeadingComponent } from 'rsuite'

const Heading = ({ children, className, ...rest }: any) => {
    console.log(rest)
    return (
        <HeadingComponent {...rest} className={clsx(lato900.className, className)}>{children}</HeadingComponent>
    )
}

export default Heading
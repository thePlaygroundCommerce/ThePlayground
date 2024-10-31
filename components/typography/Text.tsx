import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'
import { Text as Component } from 'rsuite'

const Text = ({ children, className, ...rest }: any) => {
    return (
        <Component {...rest} className={clsx(latoHeavy.className, className)}>{children}</Component>
    )
}

export default Text
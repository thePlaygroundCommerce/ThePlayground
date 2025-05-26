import { latoHeavy } from 'app/fonts'
import clsx from 'clsx'

const Text = ({ children, className, ...rest }: any) => {
    return (
        <p {...rest} className={clsx(latoHeavy.className, className)}>{children}</p>
    )
}

export default Text
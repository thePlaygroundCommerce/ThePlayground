import clsx from 'clsx'
import { AppProps } from 'index'

const Divider = (props: AppProps) => {
    return (
        <div className={clsx('h-1 min-w-2', props.className)} />
    )
}

export default Divider
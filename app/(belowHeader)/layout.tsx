import { LayoutPageProps } from 'app/layout'

const layout = ({ children }: LayoutPageProps) => {
    return (
        <div className='pt-16'>{children}</div>
    )
}

export default layout
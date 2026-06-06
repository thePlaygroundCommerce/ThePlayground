import React from 'react'


const layout = ({ children }: LayoutProps<"/log">) => {
    return (
        <div className="md:max-w-5xl mx-auto">
            {children}
        </div>
    )
}

export default layout
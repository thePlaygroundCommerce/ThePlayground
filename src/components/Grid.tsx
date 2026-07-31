import React from 'react'

type Props = {}

const Grid = ({ items }) => {
    return (
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid gap-4 rounded-4xl border border-slate-200 bg-zinc-800 p-4 shadow-sm md:grid-cols-4 md:p-6">
                {items.map((item, index) => (
                    <div className="text-center" key={index}>
                        <div className="text-3xl font-semibold text-slate-100">{item.info}</div>
                        <div className="text-sm text-slate-200/75">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Grid
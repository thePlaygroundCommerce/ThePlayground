"use client";

import { Input } from '@headlessui/react';
import { useMemo, useState } from 'react';
import Button from './Button';
import _ from 'lodash';

const expandableSections = ['category', 'size', 'colors', 'occasion', 'fabric', 'top style', 'bottom style', 'price'];

const sectionOptions: Record<string, string[]> = {
    category: ['Dresses', 'Tops', 'Matching Sets', 'Swimwear', 'Shorts', 'Jumpsuits'],
    size: ['XXS', 'XS', 'S', 'S/M', 'M', 'M/L'],
    colors: ['Black', 'White', 'Blue', 'Red', 'Beige'],
    occasion: ['Everyday', 'Vacation', 'Work', 'Evening', 'Beach'],
    fabric: ['Cotton', 'Linen', 'Silk', 'Denim', 'Leather'],
    'top style': ['Crop', 'Blouse', 'Tank', 'Hoodie', 'Jacket'],
    'bottom style': ['Shorts', 'Skirt', 'Leggings', 'Jeans', 'Joggers'],
    price: ['$0–$50', '$50–$100', '$100–$200', '$200+'],
};

type Props = {
    count: number
    activeFilters: Record<string, string>
}

export default function ProductFiltersSidebar({ count = 0, activeFilters = {} }: Props) {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
        expandableSections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
    );

    const handleToggle = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const resolvedFilters = Object.fromEntries(Object.entries(activeFilters).filter(([k]) => expandableSections.includes(k)).map(([k,v]) => [k, v]).map(([k,v]) => [k, v.split(",")]))

    const renderedSections = useMemo(
        () =>
            expandableSections.map((section) => {
                const isExpanded = expandedSections[section];
                return (
                    <div key={section} className="rounded-3xl border border-zinc-200 overflow-hidden bg-zinc-100">
                        <button
                            type="button"
                            onClick={() => handleToggle(section)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-zinc-900 transition hover:bg-zinc-200"
                        >
                            <span>{_.capitalize(section)}</span>
                            <span className="text-xl leading-none text-zinc-500">{isExpanded ? '−' : '+'}</span>
                        </button>
                        {isExpanded && (
                            <div className="space-y-3 border-t border-zinc-200 px-4 py-4 bg-white">
                                {section === 'Size' ? (
                                    <div className="grid grid-cols-3 gap-3">
                                        {sectionOptions[section]?.map((option) => (
                                            <Button
                                                key={option}
                                                type="button"
                                                className="rounded-2xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-200"
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                ) : (
                                    sectionOptions[section]?.map((option) => (
                                        <label key={option} className="flex items-center gap-3 text-sm text-zinc-900">
                                            <Input type="checkbox" defaultChecked={resolvedFilters[section]?.includes(option.toLowerCase())} className="h-4 w-4 rounded border-zinc-300 text-zinc-700 focus:ring-zinc-400" />
                                            <span>{option}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                );
            }),
        [expandedSections]
    );

    return (
        <aside className="sticky top-24 pb-12">
            <div className="rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="px-4 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">Refine by</h2>
                        <p className="text-xs font-semibold text-zinc-900 uppercase">{count} products</p>
                    </div>
                    <label htmlFor="product-filter-search" className="sr-only">
                        Search within filters
                    </label>
                    <input
                        id="product-filter-search"
                        type="search"
                        placeholder="Search"
                        className="mt-4 w-full rounded-3xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200"
                    />
                </div>
                <div className='h-1 border-b border-zinc-300' />
                <div className="space-y-3 px-4 py-5">{renderedSections}</div>
            </div>
        </aside>
    );
}

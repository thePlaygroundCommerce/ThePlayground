"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';

type TocItem = {
    heading: string;
    id: string;
};

export default function BlogTableOfContents({ items }: { items: TocItem[] }) {
    if (!items.length) return null;

    return (
        <Disclosure as="div" defaultOpen className="rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm overflow-hidden">
            {({ open }) => (
                <>
                    <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-zinc-900 transition hover:bg-zinc-100">
                        <span>Table of Contents</span>
                        <span className="text-xl text-zinc-500">{open ? '−' : '+'}</span>
                    </DisclosureButton>
                    <div className="overflow-hidden border-t border-zinc-200">
                        <DisclosurePanel
                            transition
                            className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0 bg-white px-5 py-4"
                        >
                            <ul className="space-y-2 text-sm text-zinc-700">
                                {items.map(({ heading, id }) => (
                                    <li key={id}>
                                        <a
                                            href={`#${id}`}
                                            className="block rounded-2xl px-3 py-2 transition hover:bg-zinc-100 hover:text-zinc-900"
                                        >
                                            {heading}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </DisclosurePanel>
                    </div>
                </>
            )}
        </Disclosure>
    );
}

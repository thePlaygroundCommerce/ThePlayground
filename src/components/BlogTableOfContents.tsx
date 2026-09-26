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

export const DisclosureList = ({ items }: { items: (TocItem & { content?: string })[] }) => {

    return items.map(({ heading, id, content }, index) => {
        return (
            <Disclosure key={index} as="div" defaultOpen className="rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm overflow-hidden">
                {({ open }) => (
                    <>
                        <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left text-base font-semibold text-zinc-900 transition hover:bg-zinc-100">
                            <span>Day 1 Itinerary</span>
                            <span className="text-xl text-zinc-500">{open ? '−' : '+'}</span>
                        </DisclosureButton>
                        <div className="overflow-hidden border-t border-zinc-200">
                            <DisclosurePanel
                                transition
                                className="origin-top transition duration-200 ease-out data-closed:-translate-y-6 data-closed:opacity-0 bg-white px-5 py-4"
                            >
                                <p>We depart the Phoenix/Scottsdale area between 6:00am – 7:00am and travel through the cacti-covered mountains of the Sonoran Desert. Watch the terrain change to grasslands and high desert as we approach the Red Rocks of Sedona.

                                    The tour will begin to explore the mystique surrounding Sedona with options ranging from cultural and spiritual to adventurous and active. You will enjoy views of the famous red rock features of Bell Rock, Airport Mesa, and Chapel of the Holy Cross. You will also be treated to views of Cathedral Rock, Snoopy Rock, and Submarine Rock, to name a few.</p>
                            </DisclosurePanel>
                        </div>
                    </>
                )}
            </Disclosure>
        )
    })
}

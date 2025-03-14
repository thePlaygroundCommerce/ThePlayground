import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { BsChevronDown } from "react-icons/bs";
import { Fragment } from "react";
import Heading from 'components/typography/Heading';


const Page = () => {


  const topics = ["Shipping", "Returns", "Feedback"];

  return (
    <div className="p-4 container mx-auto">
      <div className="h-screen w-full px-4">
        {/* <div className="mx-auto w-full max-w-lg divide-y divide-black/5 rounded-xl bg-black/5"> */}
        <div className="mx-auto w-full max-w-lg rounded-xl">
          {topics.map(topic => (
            <Fragment key={topic}>
              <Heading level={2}>{topic}</Heading>
              <Disclosure as="div" className="p-6">
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                    What is your refund policy?
                  </span>
                  <BsChevronDown className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-black/50">
                  If you're unhappy with your purchase, we'll refund you in full.
                </DisclosurePanel>
              </Disclosure>
              <Disclosure as="div" className="p-6">
                <DisclosureButton className="group flex w-full items-center justify-between">
                  <span className="text-sm/6 font-medium text-black group-data-[hover]:text-black/80">
                    Do you offer technical support?
                  </span>
                  <BsChevronDown className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-2 text-sm/5 text-black/50">No.</DisclosurePanel>
              </Disclosure>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

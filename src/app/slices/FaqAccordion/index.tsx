import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";
import styles from "@/styles/FaqAccordion.module.css";
import DropdownMenu from "../components/DropdownList";

/**
 * Props for `FaqAccordion`.
 */
export type FaqAccordionProps = SliceComponentProps<Content.FaqAccordionSlice>;

/**
 * Component for "FaqAccordion" Slices.
 */
const FaqAccordion: FC<FaqAccordionProps> = ({ slice }) => {
  return (
    <section
      className={styles.container}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.content}>
        <div className={styles.headline}>
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className={styles.description}>
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className={styles.accordionContainer}>
          {slice.primary.faq_items.map((item, index) => (
            <DropdownMenu key={index} {...{
              question: item.question,
              answer: item.answer
            }} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;

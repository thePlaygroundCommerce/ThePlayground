'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { PrismicRichText } from "@prismicio/react";
import { FiChevronDown } from "react-icons/fi";
import styles from "@/styles/FaqAccordion.module.css";

const DropdownMenu = ({ question, answer }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={styles.disclosureWrapper}>
          <DisclosureButton className={styles.disclosureButton}>
            <div className={styles.questionText}>
              <p>{question}</p>
            </div>
            <FiChevronDown
              className={`${styles.chevron} ${open ? styles.chevronOpen : ""
                }`}
            />
          </DisclosureButton>
          <DisclosurePanel
            static
            className={({ open }) =>
              `${styles.disclosurePanel} ${open ? styles.panelOpen : styles.panelClosed}`
            }
          >
            <div className={styles.answerText}>
              <PrismicRichText field={answer} />
            </div>
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
};

export default DropdownMenu;

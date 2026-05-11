import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import styles from "./BenefitsCallout.module.css";

/**
 * Props for `BenefitsCallout`.
 */
export type BenefitsCalloutProps =
  SliceComponentProps<Content.BenefitsCalloutSlice>;

/**
 * Component for "BenefitsCallout" Slices.
 */
const BenefitsCallout: FC<BenefitsCalloutProps> = ({ slice }) => {
  return (
    <section
      className={styles.container}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className={styles.content}>
        <div className={styles.headline}>
          <PrismicRichText field={slice.primary.headline} />
        </div>
        <div className={styles.subheading}>
          <PrismicRichText field={slice.primary.subheading} />
        </div>
        <ul className={styles.benefitsList}>
          {slice.primary.benefits.map((item, index) => (
            <li key={index} className={styles.benefitItem}>
              <div className={styles.checkmark}>✓</div>
              <div className={styles.benefitText}>
                <PrismicRichText field={item.benefit_text} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BenefitsCallout;

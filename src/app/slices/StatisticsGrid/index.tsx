import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Grid from "@/components/Grid";

/**
 * Props for `StatisticsGrid`.
 */
export type StatisticsGridProps =
  SliceComponentProps<Content.StatisticsGridSlice>;

/**
 * Component for "StatisticsGrid" Slices.
 */
const StatisticsGrid: FC<StatisticsGridProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Grid items={slice.primary.statistics} />
    </section>
  );
};

export default StatisticsGrid;

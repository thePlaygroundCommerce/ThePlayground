import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import { components } from "../slices";
import { PageProps } from "index";

export default async function SliceSimulatorPage({ searchParams }: PageProps) {
  const slices = getSlices((await searchParams).state);
  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
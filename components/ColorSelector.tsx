"use client";

import React, { useState } from "react";
import _ from "lodash";
import clsx from "clsx";
import { CatalogObject } from "square";
import Radio from "components/Radio";
import { SelectPicker } from "rsuite";

type Props<Data> = {
  onChange: (a: any) => void;
  type: "RADIO" | "DROPDOWN";
  selectedIndex?: number;
  data: Data[];
};

const Selector = <T,>({
  type,
  data,
  onChange,
  ...rest
}: Props<CatalogObject | undefined>) => {
  const Component = selectorCompMap[type];
  if (!Component) throw Error("Selector type doesn't map to a Component");

  const selectorData = data.map(({ id, itemOptionValueData }) => ({
    label: itemOptionValueData?.name,
    value: {
      optionId: itemOptionValueData?.itemOptionId,
      optionValueId: id,
    },
  }));

  const handleOnSelect = (value: any) => {
    onChange(value);
  };

  //@ts-ignore
  return <Component onChange={handleOnSelect} data={selectorData} {...rest} />;
};

export default Selector;

const RadioSelector = ({
  selectedIndex: selected = 0,
  data = [],
  onChange,
}: Props<{
  label: string;
  value: {};
}>) => {
  const { label } = data[selected];
  const hasHexColor = label.includes("#")
  let title = !hasHexColor ? label : label
    .substring(0, label.indexOf("#"))

    title = title.split(" ")
    .map(_.capitalize)
    .join(" ");

  return (
    <div className="">
      <p className="pb-4">{title}</p>
      <div className="flex justify-center">
        {data.map(({ label, value }: any, i: string | number) => {
          return (
            <Radio
              onClick={onChange}
              checked={i === selected}
              key={label}
              value={value}
              color={label.substring(label.indexOf("#"))}
            />
          );
        })}
      </div>
    </div>
  );
};

const DropdownSelector = ({
  selectedIndex = 0,
  data = [],
  onChange,
}: Props) => {
  return (
    <SelectPicker
      data={data}
      onChange={onChange}
      searchable={false}
      cleanable={false}
    //   disabled={(options.size.productOptionValues?.length ?? 0) === 0}
      placeholder={_.capitalize(data[selectedIndex].label).slice(0, 1)}
      defaultValue={data[selectedIndex].value}
    />
  );
};

const selectorCompMap = {
  RADIO: RadioSelector,
  DROPDOWN: DropdownSelector,
};

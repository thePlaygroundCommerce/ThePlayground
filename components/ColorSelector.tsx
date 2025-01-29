"use client";

import React, { useState } from "react";
import _ from "lodash";
import clsx from "clsx";
import { CatalogImage, CatalogObject } from "square";
import Radio from "components/Radio";
import { Panel, SelectPicker } from "rsuite";
import { ItemDataType } from "rsuite/esm/MultiCascadeTree";
import Button from "./Button";
import Image from "./Image";

type Props<Data> = {
  onChange: (a: any) => void;
  type?: keyof SelectorComponentMap;
  selectedIndex?: number;
  data: Data[];
};

const Selector = <T,>({
  type,
  data,
  onChange,
  ...rest
}: Props<CatalogObject | undefined>) => {
  const Component = selectorCompMap[type ?? "RADIO"];
  if (!Component) throw Error("Selector type doesn't map to a Component");

  const selectorData = data.map(
    ({ id, itemOptionValueData, imageData } = { id: "", type: "" }) => ({
      label: itemOptionValueData?.name ?? "",
      value: {
        optionId: itemOptionValueData?.itemOptionId,
        optionValueId: id,
      },
      imageData,
    })
  );

  const handleOnSelect = (value: any) => {
    onChange(value);
  };

  return <Component onChange={handleOnSelect} data={selectorData} {...rest} />;
};

export default Selector;

type SelectorProps = {
  label: string;
  value: unknown;
  imageData?: CatalogImage;
};

const RadioSelector = ({
  selectedIndex: selected = 0,
  data = [],
  onChange,
}: Props<SelectorProps>) => {
  const { label } = data[selected];
  const hasHexColor = label.includes("#");
  let title = !hasHexColor ? label : label.substring(0, label.indexOf("#"));

  title = title.split(" ").map(_.capitalize).join(" ");

  return (
    <div className="w-full flex justify-around items-center">
      <p>{title}</p>
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
}: Props<SelectorProps>) => {
  return (
    <SelectPicker
      data={data}
      onChange={onChange}
      searchable={false}
      cleanable={false}
      //   disabled={(options.size.productOptionValues?.length ?? 0) === 0}
      placeholder={_.capitalize(data[selectedIndex].label as string).slice(
        0,
        1
      )}
      defaultValue={data[selectedIndex].value}
    />
  );
};

const CardSelector = ({
  selectedIndex = 0,
  data = [],
  onChange,
}: Props<SelectorProps>) => {
  return (
    <div className="flex gap-2 w-full">
      {data.map(({ label, value }, i) => (
        <Button
          key={i}
          onClick={() => onChange(value)}
          className={clsx(
            selectedIndex == i && "bg-mintcream-600 text-white",
            "border rounded flex-1 w-0 shadow-md"
          )}
        >
          {label?.slice(0, 1).toUpperCase()}
        </Button>
      ))}
    </div>
  );
};

const ProductSelector = ({
  selectedIndex = 0,
  data = [],
  onChange,
}: Props<SelectorProps>) => {
  const label = data[selectedIndex].label;
  const modifedLabel = label.indexOf("#")
    ? `${label.slice(0, label.indexOf("#"))} # ${label.slice(label.indexOf("#") + 1)}`
    : data[selectedIndex].label;

  return (
    <div>
      <p className="text-center pb-1 text-sm text-zinc-500">
        {_.capitalize(modifedLabel)}
      </p>
      <div className="flex gap-2">
        {data.map(({ label, value, imageData }, i) => (
          <div
            key={label}
            onClick={() => onChange(value)}
            className={clsx(
              selectedIndex === i ? "border-mintcream-500" : "border-zinc-300",
              " border-2 rounded overflow-hidden w-14 h-14 relative box-content"
            )}
          >
            <Image
              src={imageData?.url}
              alt={imageData?.caption ?? ""}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

type SelectorComponentMap = {
  RADIO: ({
    selectedIndex,
    data,
    onChange,
  }: Props<{
    label: string;
    value: unknown;
  }>) => React.JSX.Element;
  DROPDOWN: ({
    selectedIndex,
    data,
    onChange,
  }: Props<ItemDataType>) => React.JSX.Element;
  CARD: ({
    selectedIndex,
    data,
    onChange,
  }: Props<ItemDataType>) => React.JSX.Element;
  PRODUCT: ({
    selectedIndex,
    data,
    onChange,
  }: Props<ItemDataType>) => React.JSX.Element;
};

const selectorCompMap = {
  RADIO: RadioSelector,
  DROPDOWN: DropdownSelector,
  CARD: CardSelector,
  PRODUCT: ProductSelector,
};

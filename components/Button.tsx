"use client";

import clsx from "clsx";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { Loader } from "rsuite";
import { AppProps } from "index";

type Props = {
  variant?: keyof typeof variants
  padding?: number;
  loading?: boolean;
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const variants = {
  link: "",
  primary: "bg-mintcream-800 text-white",
  outline: "border-mintcream-600 border-2 text-mintcream-600",

}

const Button = ({
  variant = 'link',
  children,
  loading,
  padding = 2,
  onClick,
  className,
  type = 'button',
  ...rest
}: Props) => {

  let pending = false;
  if (type == "submit") pending = useFormStatus().pending;

  return (
    <button
      type={type}
      aria-disabled={pending}
      className={clsx(className, `p-${padding} rounded`, variants[variant])}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        <Loader />
      ) : children}
    </button>
  );
};

export default Button;

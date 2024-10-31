"use client";

import clsx from "clsx";
import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { AppProps } from "types";

type Props = {
  variant?: keyof typeof variants
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const variants = {
  link: "",
  primary: "bg-mintcream-800 text-white",
  outline: "border-mintcream-600 border-2 text-mintcream-600",

}

const Button = ({
  variant = 'link',
  children,
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
      className={clsx("p-2 rounded", variants[variant], className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

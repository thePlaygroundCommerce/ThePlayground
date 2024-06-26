"use client";

import clsx from "clsx";
import { useFormStatus } from "react-dom";

const Button = ({ children, onClick, className, type }: any) => {
  let pending = false;
  if (type == "submit") pending = useFormStatus().pending;

  return (
    <button
      aria-disabled={pending}
      className={clsx("border p-3 rounded-lg", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

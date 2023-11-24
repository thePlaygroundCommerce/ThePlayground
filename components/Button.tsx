'use client'

import clsx from "clsx"

const Button = ({ children, onClick, className }: any) => {
  return (
    <button className={clsx(className, "border p-3 rounded-lg")} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

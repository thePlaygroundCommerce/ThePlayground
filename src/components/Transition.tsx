"use client";

import { ReactNode, useEffect, useState } from "react";


const Transition = ({ children }: { children: ReactNode | ((start: boolean) => ReactNode) }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  return typeof children === 'function' ? children(start) : children
};

export default Transition;

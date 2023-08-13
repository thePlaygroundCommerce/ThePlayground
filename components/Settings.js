"use client";

import { NavigationContext } from "context/navigationContext";
import { useContext } from "react";

const Settings = () => {
  const [{ components, activeIndex }] = useContext(NavigationContext);

  const Component = components[activeIndex]
  return <Component />;
};

export default Settings;

import { AppProps } from "index";
import { FC } from "react";

/**
 * Adds a wrapper around children if a condition is true.
 */
export function ConditionalWrap({ condition, wrap: Wrap, children }: AppProps & { condition: unknown, wrap: FC<{ children: React.ReactNode }> }) {
  return condition ? <Wrap>{children}</Wrap> : children;
}

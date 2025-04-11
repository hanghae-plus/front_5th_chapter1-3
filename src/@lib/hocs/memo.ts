import React, { ComponentType } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals: (prev: Readonly<P>, next: Readonly<P>) => boolean = shallowEquals,
) {
  return function MemoizedWrapper(props: P) {
    const prevProps = useRef<P | null>(null);
    const cachedElement = useRef<JSX.Element | null>(null);

    const shouldUpdate =
      prevProps.current === null || !equals(prevProps.current, props);

    if (shouldUpdate) {
      cachedElement.current = React.createElement(Component, props);
      prevProps.current = props;
    }
    return cachedElement.current!;
  };
}

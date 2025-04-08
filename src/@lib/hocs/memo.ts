import React, { ComponentType } from "react";

import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const renderedElementRef = useRef<React.ReactElement | null>(null);

    const shouldUpdate =
      !prevPropsRef.current || !_equals(prevPropsRef.current, props);

    if (shouldUpdate) {
      prevPropsRef.current = props;
      renderedElementRef.current = React.createElement(Component, props);
    }

    return renderedElementRef.current;
  };
}

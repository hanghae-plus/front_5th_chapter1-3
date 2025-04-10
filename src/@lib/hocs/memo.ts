import { shallowEquals } from "../equalities";
import React, { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function WrapperComponent(props: P) {
    const prevProps = useRef<P | null>(null);
    const element = useRef<React.ReactNode | null>(null);

    if (prevProps.current === null || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      element.current = createElement(Component, props);
    }

    return element.current;
  };
}

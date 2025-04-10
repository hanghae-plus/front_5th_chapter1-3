import React, { ComponentType } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function (props: P) {
    const prevProps = useRef<P | null>(null);

    if (prevProps.current && _equals(prevProps.current, props)) {
      return null; // props 같으면 렌더링 하지 않음
    }

    prevProps.current = props;

    return React.createElement(Component, props);
  };
}

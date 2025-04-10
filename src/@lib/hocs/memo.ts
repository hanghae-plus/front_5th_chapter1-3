import { shallowEquals } from "../equalities";
import { ComponentType, ReactElement, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let prevResult: ReactElement | null = null;

  return (props: P) => {
    if (prevProps === null || !_equals(prevProps, props)) {
      prevProps = { ...props };
      prevResult = createElement(Component, props);
    }

    return prevResult;
  };
}

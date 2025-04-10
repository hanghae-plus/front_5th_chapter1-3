import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let memorized: ReactNode | null = null;

  return function MemoizedComponent(props: P) {
    if (prevProps === null || !_equals(prevProps, props)) {
      memorized = createElement(Component, props);
      prevProps = props;
    }
    return memorized as ReactNode;
  };
}

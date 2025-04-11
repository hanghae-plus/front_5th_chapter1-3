import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const ref = useRef<{
      prevProps: P | null;
      prevResult: ReactElement | null;
    }>({
      prevProps: null,
      prevResult: null,
    });

    if (!ref.current.prevProps || !_equals(ref.current.prevProps, props)) {
      ref.current.prevProps = props;
      ref.current.prevResult = createElement(Component, props);
    }

    return ref.current.prevResult;
  };
}

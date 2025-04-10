import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const cachedRenderRef = useRef<React.ReactNode | null>(null);

    if (!prevPropsRef.current || !_equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      cachedRenderRef.current = createElement(Component, props);
    }

    return cachedRenderRef.current;
  };
}

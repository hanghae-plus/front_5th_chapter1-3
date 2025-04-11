import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P): JSX.Element {
    const prevProsRef = useRef<P | null>(null);
    const renderedElementRef = useRef<JSX.Element | null>(null);

    const shouldRender =
      prevProsRef.current === null || !_equals(prevProsRef.current, props);
    if (shouldRender) {
      prevProsRef.current = props;
      renderedElementRef.current = createElement(Component, props);
    }

    return renderedElementRef.current!;
  };
}

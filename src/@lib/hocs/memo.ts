import { shallowEquals } from "../equalities";
import { ComponentType, useRef, ReactElement, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function Memoized(props: P): ReactElement {
    const prevPropsRef = useRef<P | null>(null);
    const renderedRef = useRef<ReactElement | null>(null);

    const isSame = prevPropsRef.current && _equals(prevPropsRef.current, props);

    if (isSame && renderedRef.current) {
      return renderedRef.current;
    }

    const rendered = createElement(Component, props);
    renderedRef.current = rendered;
    prevPropsRef.current = props;

    return rendered;
  };
}

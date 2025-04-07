import { shallowEquals } from "../equalities";
import { createElement, type ComponentType, type ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
): ComponentType<P> {
  return function MemoizedComponent(props: P): ReactElement {
    const ref = useRef<{
      props: P;
      element: ReactElement;
    }>({
      props,
      element: createElement(Component, props),
    });

    if (!equals(ref.current.props, props)) {
      ref.current = {
        props,
        element: createElement(Component, props),
      };
    }

    return ref.current.element;
  };
}

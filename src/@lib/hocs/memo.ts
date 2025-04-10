import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemorizedComponent(props: P): ReactElement {
    const prevPropsRef = useRef<null | P>(null);
    const prevRenderRef = useRef<ReactElement | null>(null);

    const isUpdated =
      !prevPropsRef.current || !_equals(prevPropsRef.current, props);

    if (isUpdated) {
      prevPropsRef.current = props;
      prevRenderRef.current = createElement(Component, props);
    }

    return prevRenderRef.current!;
  };
}

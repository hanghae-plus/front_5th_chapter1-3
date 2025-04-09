import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return function MemoizedComponent(props: P): JSX.Element {
    const prevPropsRef = useRef<P>(null);
    const prevResultRef = useRef<JSX.Element>(null);

    if (
      prevPropsRef.current !== undefined &&
      _equals(prevPropsRef.current, props)
    ) {
      return prevResultRef.current!;
    }

    const result = React.createElement(Component, props);
    prevPropsRef.current = props;
    prevResultRef.current = result;

    return result;
  };
}

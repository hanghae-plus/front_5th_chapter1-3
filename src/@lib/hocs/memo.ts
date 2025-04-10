/* eslint-disable react-hooks/rules-of-hooks */
import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return function memoComponent(props: P) {
    const memoCompoentRef = useRef<{
      prevProps: P;
      element: JSX.Element;
    } | null>(null);

    if (
      memoCompoentRef.current &&
      _equals(memoCompoentRef.current.prevProps, props)
    ) {
      return memoCompoentRef.current.element;
    }

    const element = React.createElement(Component, props);
    memoCompoentRef.current = {
      prevProps: props,
      element: element,
    };
    return element;
  };
}

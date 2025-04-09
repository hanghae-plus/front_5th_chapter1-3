/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";
import { ComponentType, createElement, ReactElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const memoizedProps = useRef<P | null>(null);
    const memoizedComponent = useRef<ReactElement | null>(null);

    if (
      (memoizedProps.current === null && memoizedComponent.current === null) ||
      !_equals(memoizedProps.current, props)
    ) {
      memoizedProps.current = props;
      memoizedComponent.current = createElement(Component, props);
    }

    return memoizedComponent.current;
  };
}

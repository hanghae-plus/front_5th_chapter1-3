import { shallowEquals } from "../equalities";
import { ReactElement } from "react";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P): JSX.Element => {
    const prevPropsRef = useRef<P | null>(null);
    const prevElementRef = useRef<ReactElement | null>(null);

    // 첫 렌더거나 props가 변경되었을 때
    if (
      prevPropsRef.current === null ||
      !_equals(prevPropsRef.current, props)
    ) {
      prevPropsRef.current = props;
      prevElementRef.current = React.createElement(Component, props);
    }

    return prevElementRef.current as JSX.Element;
  };

  return MemoizedComponent;
}

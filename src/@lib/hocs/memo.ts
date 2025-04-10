import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

// HOC 정의
export function memo<P extends object>(
  Component: ComponentType<P>, // ComponentType으로 타입 지정
  _equals = shallowEquals,
) {
  function Wrapper(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    const renderedRef = useRef<React.ReactElement | null>(null);

    const hasChanged =
      !prevPropsRef.current || !_equals(prevPropsRef.current, props);

    if (hasChanged) {
      prevPropsRef.current = props;
      renderedRef.current = React.createElement(Component, props);
    } else {
      console.log("🧠 memo로 스킵됨", props);
    }

    return renderedRef.current;
  }

  return Wrapper;
}

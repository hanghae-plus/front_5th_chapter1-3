import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks/useRef.ts";
import React from "react";

export function deepMemo<P extends object>(Component: ComponentType<P>) {
  const MemoizedComponent = function (props: P) {
    const ref = useRef({
      props: {},
    });

    if (!deepEquals(props, ref.current.props)) {
      ref.current.props = props;
      return React.createElement(Component, props);
    }
  };

  return MemoizedComponent;
}

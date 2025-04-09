/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function Memoed(props: P) {
    const state = useRef<{ component: React.ReactElement; props: P } | null>(
      null,
    );

    if (state.current === null || !_equals(state.current.props, props)) {
      state.current = {
        props,
        component: createElement(Component, props),
      };
    }

    return state.current.component;
  };
}

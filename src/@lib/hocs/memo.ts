/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  /**
   * props로 전달하는 값이 변경되어야 리렌더링 된다.
   * Q. 컴포넌트의 props를 어떻게 가져올 것인가?
   */

  const MemoizedComponent = function (props: P) {
    const ref = useRef({
      props: {},
    });

    if (!shallowEquals(props, ref.current.props)) {
      ref.current.props = props;
      return React.createElement(Component, props);
    }
  };

  return MemoizedComponent;
}

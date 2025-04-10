import React, { ComponentType } from "react";
import { shallowEquals } from "../equalities";
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
      props,
      element: React.createElement(Component, props),
    });

    if (!_equals(props, ref.current.props)) {
      ref.current.props = props;
      ref.current.element = React.createElement(Component, props);
    }
    return ref.current.element;
  };

  return MemoizedComponent;
}

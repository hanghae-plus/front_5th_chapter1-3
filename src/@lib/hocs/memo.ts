import { ComponentType, createElement, isValidElement } from "react";

import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  // 컴포넌트 유효성 검사
  if (!isValidElement(createElement(Component))) {
    throw new Error("Invalid component passed to memo");
  }

  return function Memoized(props: P) {
    const prevProps = useRef(props);
    const memoizedComponent = useRef<JSX.Element>(
      createElement(Component, props)
    );

    const isPropsChanged = !_equals(prevProps.current, props);

    // props 가 변경된 경우에만 컴포넌트를 새로 생성
    if (isPropsChanged) {
      prevProps.current = props;
      memoizedComponent.current = createElement(Component, props);
    }

    return memoizedComponent.current;
  };
}

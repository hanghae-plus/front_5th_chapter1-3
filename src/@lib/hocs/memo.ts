/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    const prevComponentRef = useRef<JSX.Element | null>(null);
    const component = React.createElement(Component, props);

    // 2. 메모이제이션된 컴포넌트 생성
    if (prevPropsRef.current === null) {
      prevPropsRef.current = props;
      prevComponentRef.current = component;
    }

    // 3. equals 함수를 사용하여 props 비교
    const shouldUpdate = !_equals(prevPropsRef.current, props);

    if (shouldUpdate) {
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      prevPropsRef.current = props;
      prevComponentRef.current = component;
    }

    return prevComponentRef.current;
  };
}

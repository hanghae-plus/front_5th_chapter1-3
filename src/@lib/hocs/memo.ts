import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

export function memo<P extends object>(
  Component: ComponentType<P>, // 원본 컴포넌트
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevProps = useRef<P | null>(null); // 1. 이전 props를 저장할 ref 생성
    const prevResult = useRef<JSX.Element | null>(null); // 2. 메모이제이션된 컴포넌트 생성
    // 3. equals 함수를 사용하여 props 비교
    if (prevProps.current && _equals(prevProps.current, props)) {
      return prevResult.current;
    }
    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    const result = React.createElement(Component, props);
    prevProps.current = props;
    prevResult.current = result;
    return result;
  };
}

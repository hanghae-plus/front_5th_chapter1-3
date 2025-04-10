import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks";
import React from "react";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 전체 함수 컴포넌트 정의
  function MemoizedComponent(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null);

    // 2. 이전 결과를 저장할 ref 생성
    const prevResultRef = useRef<React.ReactNode | null>(null);

    // 2. equals 함수를 사용하여 props 비교
    // 첫 렌더링인 경우(prevPropsRef.current === null) 또는
    // props가 변경된 경우(!_equals(...)) true 반환
    if (
      prevPropsRef.current === null ||
      !_equals(prevPropsRef.current, props)
    ) {
      // 3. // props가 변경되었거나 첫 렌더링인 경우 새로 렌더링
      const result = React.createElement(Component, props);
      // 현재 props와 결과 저장
      prevPropsRef.current = { ...props };
      prevResultRef.current = result;
    }

    return prevResultRef.current;
  }

  return MemoizedComponent;
}

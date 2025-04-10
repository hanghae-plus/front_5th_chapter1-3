import { shallowEquals } from "../equalities";
import { ComponentType } from "react";
import { useRef } from "../hooks/useRef";
import React from "react";

/**
 * 1. 이전 props를 저장할 ref 생성
 * 2. 메모이제이션된 컴포넌트 생성
 * 3. equals 함수를 사용하여 props 비교
 * 4. props가 변경된 경우에만 새로운 렌더링 수행
 * @param Component 메모이제이션할 컴포넌트
 * @param _equals 비교 함수
 * @returns 메모이제이션된 컴포넌트
 */

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedWrapper(props: P) {
    const prevProps = useRef(props);
    const memoizedComponent = useRef<JSX.Element | null>(null);

    if (
      !_equals(prevProps.current, props) ||
      memoizedComponent.current === null
    ) {
      prevProps.current = props;

      memoizedComponent.current = React.createElement(Component, props);
    }

    return memoizedComponent.current;
  };
}

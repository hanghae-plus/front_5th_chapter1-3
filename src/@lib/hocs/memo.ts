/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return function MemoizedComponent(props: P) {
    // 1. 이전 props 저장
    const prevProps = useRef<P | null>(null);
    // 2. 이전 렌더링 결과 저장
    const result = useRef<React.ReactElement | null>(null);

    // 3. 비교 함수를 사용하여 props가 변경되었는지 확인
    const isChanged =
      prevProps.current === null || !_equals(prevProps.current, props);

    // props가 변경되었으면 새로운 결과 계산
    if (isChanged) {
      result.current = React.createElement(Component, props); // props가 변경되었으면 새로운 결과 계산
    }

    // 현재 props를 이전 props로 저장
    prevProps.current = props;

    // 메모이제이션된 결과 반환
    return result.current;
  };
}

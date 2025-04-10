import React from "react";
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

/**
 * memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
 * 1. 이전 props를 저장할 ref 생성
 * 2. 메모이제이션된 컴포넌트 생성
 *  - equals 함수를 사용하여 props 비교
 *  - props가 변경된 경우에만 새로운 렌더링 수행
 * 3. 메모이제이션된 컴포넌트 반환
 * @param Component
 * @param _equals
 * @returns
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals: (prev: P, next: P) => boolean = shallowEquals,
): (props: P) => React.ReactElement | null {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let memoizedResult: React.ReactElement | null = null;

  // 2. 메모이제이션된 컴포넌트 생성 및 반환
  return function MemoizedComponent(props: P): React.ReactElement | null {
    // 2-1. equals 함수를 사용하여 props 비교
    if (prevProps === null || !equals(prevProps, props)) {
      memoizedResult = React.createElement(Component, props);
    }
    // 2-2. props가 변경되지 않은 경우 이전 결과 반환
    prevProps = props;
    // 3. 메모이제이션된 컴포넌트 반환
    return memoizedResult;
  };
}

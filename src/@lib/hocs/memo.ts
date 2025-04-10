import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  let oldProps: P | null = null;
  let memorized: ReactNode | null = null;

  // 2. 메모이제이션된 컴포넌트 생성
  return function MemoizedComponent(props: P) {
    if (oldProps === null || !_equals(oldProps, props)) {
      // 3. equals 함수를 사용하여 props 비교
      memorized = createElement(Component, props);

      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      oldProps = props;
    }
    return memorized as ReactNode;
  };
}

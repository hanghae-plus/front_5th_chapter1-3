import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks";

// props 변경하면 컴포넌트 뱉어내기
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function Wrapped(props: P) {
    // 1. 이전 props를 저장할 ref 생성
    const ref = useRef<{ props: P; component: JSX.Element } | null>(null);

    // 2. 메모이제이션된 컴포넌트 생성
    if (ref.current === null) {
      ref.current = { props, component: React.createElement(Component) };
    }

    // 3. equals 함수를 사용하여 props 비교
    if (!_equals(ref.current.props, props)) {
      ref.current = { props, component: React.createElement(Component) };
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    return ref.current.component;
  };
}

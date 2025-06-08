import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  const MemoizedComponent = (props: P) => {
    // 1. 이전 props와 element를 저장할 ref 생성
    const previousRef = useRef<{ props: P; element: JSX.Element } | null>(null);
    const previous = previousRef.current;

    // 2. 이전 props와 현재 props가 같으면 메모된 element 반환
    if (previous && _equals(previous.props, props)) {
      return previous.element;
    }

    // 3. 새 element 생성 및 ref 갱신
    const element = React.createElement(Component, props);
    previousRef.current = { props, element };

    return element;
  };

  return MemoizedComponent;
}

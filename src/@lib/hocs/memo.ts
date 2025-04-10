import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 2. 메모이제이션된 컴포넌트 생성
  return (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevProps = useRef<P | null>(null);
    const prevComponent = useRef<ReactElement | null>(null);

    // 3. equals 함수를 사용하여 props 비교
    if (prevProps.current && _equals(prevProps.current, props)) {
      return prevComponent.current;
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    const newElement = createElement(Component, props);
    prevProps.current = props;
    prevComponent.current = newElement;
    return newElement;
  };
}

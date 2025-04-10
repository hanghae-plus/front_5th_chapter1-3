import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function Memo({ ...props }: P) {
    // 1. 이전 props를 저장할 ref 생성
    const prevProps = useRef<P | undefined>(undefined);
    const prevComponent = useRef<ReactNode | undefined>(undefined);

    // 3. equals 함수를 사용하여 props 비교
    if (!_equals(prevProps.current, props)) {
      // 4. props가 변경된 경우에만 새로운 렌더링 수행
      prevProps.current = props;
      prevComponent.current = createElement(Component);
    }

    return prevComponent.current;
  };
}

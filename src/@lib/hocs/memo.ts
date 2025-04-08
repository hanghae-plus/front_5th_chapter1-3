import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,

  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성

  const MemoComponent = (props: P) => {
    // 이전 props와 렌더링 결과를 저장하는 ref
    const ref = useRef<{
      prevProps: P | null;
      result: React.ReactNode | null;
    }>({
      prevProps: null,
      result: null,
    });

    // 첫 렌더링이거나 props가 변경된 경우 equals 함수를 사용하여 props 비교
    if (
      ref.current.prevProps === null ||
      !_equals(ref.current.prevProps, props)
    ) {
      // 새 렌더링 결과 생성
      ref.current.result = createElement(Component, props);
      // 현재 props 저장
      ref.current.prevProps = { ...props };
    }

    // 캐시된 결과 또는 새 결과 반환
    return ref.current.result;
  };

  return MemoComponent;
}

import React, { ComponentType } from "react"; // TODO: forwardRef
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null); // 이전 props 를 저장할 ref
    const componentRef = useRef<ComponentType<P> | null>(null); // 메모이제이션된 컴포넌트를 저장할 ref

    // 이전 props 가 존재하고 현재 props 와 같다면 메모이제이션된 컴포넌트 반환
    if (
      prevPropsRef.current !== undefined &&
      _equals(prevPropsRef.current, props)
    ) {
      return componentRef.current;
    }

    // 컴포넌트 업데이트 확인
    if (!_equals(prevPropsRef.current, props)) {
      prevPropsRef.current = props;
      componentRef.current = Component;
    }

    return React.createElement(componentRef.current || Component, { ...props });
  };
}

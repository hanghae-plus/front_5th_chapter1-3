import { deepEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks/useRef.ts";

/**
 * deepMemo HOC는 컨포넌트의 props를 깊은 비교하여
 * 불필요한 리렌더링을 방지합니다.
 */
export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return function MemoizedComponent(props: P) {
    const prevProps = useRef<P | null>(null);
    const prevComponent = useRef<ReactElement | null>(null);

    const isEqual = deepEquals(prevProps.current, props);
    if (!isEqual) {
      prevProps.current = props;
      prevComponent.current = createElement(Component, props);
    }

    return prevComponent.current;
  };
}

// return memo(Component, deepEquals);

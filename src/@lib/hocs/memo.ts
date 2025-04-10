/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement } from "react";
import { useRef } from "../hooks";

/**
 * memo HOC는 컴포넌트의 props를 얕은 비교하여
 * 불필요한 리렌더링을 방지합니다
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevProps = useRef<P | null>(null);
    const prevComponent = useRef<ReactElement | null>(null);

    const isEqual = shallowEquals(prevProps.current, props);
    if (!isEqual) {
      prevProps.current = props;
      prevComponent.current = createElement(Component, props);
    }

    return prevComponent.current;
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from '../hooks';

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    const prevRef = useRef<P | null>(null);
    const renderRef = useRef<React.ReactElement | null>(null);

    // 현재 props와 이전 props를 비교하여 다르면 렌더링
    if (!prevRef.current || !_equals(prevRef.current, props)) {
      prevRef.current = props;
      renderRef.current = createElement(Component, props);
    }

    return renderRef.current;
  };

  return MemoizedComponent;
}

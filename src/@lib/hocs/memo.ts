import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";
/**memo HOC는 컴포넌트의 props를 앝은 비교하여 불필요한 리렌더링을 방지합니다. */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P;
  let prevElement: ReactNode;

  return function MemoizedCompoenent(props: P) {
    if (prevProps && _equals(prevProps, props)) {
      return prevElement;
    }

    const element = createElement(Component, props);
    prevProps = props;
    prevElement = element;
    return element;
  };
}

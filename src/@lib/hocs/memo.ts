import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactElement, useRef } from "react";

const isPropKeyLengthEqual = (
  p1: object | undefined,
  p2: object | undefined,
) => {
  if (p1 === undefined || p2 === undefined) {
    return p1 === p2;
  }

  return Object.keys(p1).length === Object.keys(p2).length;
};

/** prop이 같으면 컴포넌트의 리렌더링을 방지합니다.*/
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemorisedComponent(props: P) {
    const propsRef = useRef<P | undefined>(undefined);
    const componentRef = useRef<ReactElement | undefined>(undefined);

    // 아직 값이 할당 안됐으면, equals 비교 전에 초기화
    if (componentRef.current === undefined) {
      propsRef.current = props;
      componentRef.current = createElement(Component, propsRef.current);
    }

    // props key length 및 equals 비교
    if (
      !_equals(propsRef.current, props) ||
      !isPropKeyLengthEqual(propsRef.current, props)
    ) {
      propsRef.current = props;
      componentRef.current = createElement(Component, propsRef.current);
    }

    return componentRef.current;
  };
}

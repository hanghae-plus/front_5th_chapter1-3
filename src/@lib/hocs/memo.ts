import React, { useRef } from "react";
import { shallowEquals } from "../equalities";

export function memo<P extends object>(
  Component: React.ComponentType<P>,
  equals = shallowEquals,
): React.FC<P> {
  return (props: P) => {
    // 1. 이전 의존성과 결과를 저정할 ref 생성
    const prevPropsRef = useRef<P | null>(null);
    const prevResultRef = useRef<React.ReactElement | null>(null);

    // 2. 현재 의존성과 이전 의존성 비교
    if (
      prevPropsRef.current &&
      equals(prevPropsRef.current, props) &&
      prevResultRef.current
    ) {
      return prevResultRef.current;
    }

    // 새로 렌더링해야 한다면
    prevPropsRef.current = props;
    // return <Component {...props} />; 대신
    const result = React.createElement(Component, props);
    prevResultRef.current = result; // 이 부분이 누락됨
    return result;
  };
}

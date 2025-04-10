import React from "react";
import { shallowEquals } from "../equalities";
import { ComponentType, useRef } from "react";

export function memo<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(props: P) {
    const prevPropsRef = useRef<P | null>(null);
    //prevPropsRef 란 {name: 'kk', age: 10} 과 같은 객체
    const resultRef = useRef<React.ReactElement | null>(null);
    //resultRef란 <div name="23">{name}</div>과 같은 실제 렌더링 결과

    if (
      prevPropsRef.current !== null &&
      _equals(prevPropsRef.current, props) &&
      resultRef.current !== null
    ) {
      return resultRef.current;
    }

    const result = React.createElement(Component, props);

    prevPropsRef.current = props;
    //다음 렌더때 비교하고자 저장
    resultRef.current = result;
    //다음 렌더때 비교하고자 저장
    return result;
  };
}

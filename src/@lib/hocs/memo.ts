import React from "react";
import { shallowEquals } from "../equalities";
import { ComponentType } from "react";

/*
  memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
  1. 이전 props를 저장할 ref 생성
  2. 메모이제이션된 컴포넌트 생성
  3. equals 함수를 사용하여 props 비교
  4. props가 변경된 경우에만 새로운 렌더링 수행
*/

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
): React.FC<P> {
  let propsRef: P | null = null;
  let componentRef: React.ReactElement | null = null;

  const MemoComponent = (props: P) => {
    if (propsRef === null || !_equals(propsRef, props)) {
      propsRef = { ...props };
      componentRef = React.createElement(Component, props);
    }

    return componentRef;
  };

  return MemoComponent as React.FC<P>;
}

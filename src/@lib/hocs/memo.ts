import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoComponent = (props: P) => {
    const memoProps = useRef<P | null>(null);

    if (memoProps.current === null) {
      memoProps.current = props;
      return React.createElement(Component, props);
    }
    if (!_equals(memoProps.current, props)) {
      memoProps.current = props;
      return React.createElement(Component, props);
    }
  };
  return MemoComponent; // React component names must start with an uppercase letter.
}

// HOC :
// 1. 코드 재사용성이 높다. 여러 컴포넌트에서 공통적으로 사용되는 로직이 있다면 HOC로 만들어 재사용.
// 2. 컴포넌트에 전달되는 props를 조작하거나 추가할 수 있다.
// 3. 렌더링 조건을 제어할 수 있다.
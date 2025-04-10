import { deepEquals } from "../equalities";
import React, { ComponentType } from "react";
import { memo } from "./memo.ts";

// deepMemo HOC는 컴포넌트의 props를 깊은 비교하여 불필요한 리렌더링을 방지합니다.
export function deepMemo<P extends object>(Component: ComponentType<P>) {
  const MemoizedComponent: React.FC<P> = (props: P) => {
    return React.createElement(Component, props);
  };

  return memo(MemoizedComponent, deepEquals);
}

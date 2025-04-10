import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { memo } from "./memo.ts";

/**
 * 깊은 비교를 사용하는 메모이제이션 HOC
 * @param Component 메모이제이션할 원본 컴포넌트
 * @returns 깊은 비교로 메모이제이션된 컴포넌트
 */
export function deepMemo<P extends object>(
  Component: ComponentType<P>,
  equals = deepEquals
) {
  return memo(Component, equals);
}

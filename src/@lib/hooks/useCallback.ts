/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

// const memoizedCallback = useCallback(() => mockCallback(42), deps);

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  // 1. 이전 의존성 저장할 ref
  const prevDependency = useRef<DependencyList | null>(null);
  const result = useRef<Function | null>(null);
  //2 현재 의존성과 이전 의존성 비교
  const isChanged =
    !prevDependency.current || !shallowEquals(_deps, prevDependency.current);

  // 3. 의존성이 변경된 경우 이전의존성 업데이트 + 새로운 함수 저장
  if (isChanged) {
    prevDependency.current = _deps;
    result.current = factory;
  }

  return result.current as T;
}

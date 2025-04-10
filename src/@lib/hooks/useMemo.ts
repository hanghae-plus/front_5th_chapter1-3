/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

/**
 * useMemo 가 해야 하는 일
 * factory 함수를 실행한후 그 리턴값을 반환
 * 리렌더링이 되더라도 factory 함수를 실행하지 않고 이전에 실행했던 결과를 반환
 *
 * 의존성 배열을 _equals 함수를 통해 비교하여
 * 이전 의존성 배열과 달라졌다면 다시 factory 함수를 실행하여 그 결과를 반환
 *
 * 이전 의존성 배열과 같다면 이전에 실행했던 결과를 반환
 */
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedValueRef = useRef<T | undefined>(undefined);
  const previousDepsRef = useRef<DependencyList | undefined>(undefined);

  if (!previousDepsRef.current || !_equals(previousDepsRef.current, _deps)) {
    memoizedValueRef.current = factory();
    previousDepsRef.current = _deps;
    return memoizedValueRef.current;
  }

  return memoizedValueRef.current as T;
}

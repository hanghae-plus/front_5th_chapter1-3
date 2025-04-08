import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  /** 캐싱할 값을 계산하는 함수 */
  factory: () => T,
  /** factory 함수에서 참조되는 모든 변수 */
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const valueRef = useRef<T | undefined>(undefined);
  const depsRef = useRef<DependencyList | undefined>(undefined);

  // 아직 값이 할당 안됐으면, equals 비교 전에 초기화
  if (!depsRef.current?.length) {
    depsRef.current = _deps;
    valueRef.current = factory();
  }

  if (!_equals(depsRef.current, _deps)) {
    depsRef.current = _deps;
    valueRef.current = factory();
  }

  return valueRef.current as T;
}

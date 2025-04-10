import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 계산된 값을 저장할 ref 생성
  const valueRef = useRef<T | undefined>(undefined);

  // 2. 이전 의존성 배열을 저장할 ref 생성
  const depsRef = useRef<DependencyList | undefined>(undefined);

  // 3. 의존성 비교 로직 -> 의존성이 실제로 변경되었을 때만 새로운 값을 계산
  // 첫번째 실행이거나 의존성 배열이 변경되었을때 true 반환
  const depsChanged =
    depsRef.current === undefined || !_equals(_deps, depsRef.current);

  // 4. 필요시 새 값 계산
  if (depsChanged) {
    // 새 값 계산
    const newValue = factory();

    // 계산된 새 값을 valueRef에 저장
    valueRef.current = newValue;

    // 현재 의존성 배열을 depsRef에 저장
    depsRef.current = _deps;
  }

  // 5. 저장된 값 반환
  return valueRef.current as T;
}

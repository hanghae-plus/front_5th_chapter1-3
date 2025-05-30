import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T, // 재사용하고 싶은 계산 함수
  _deps: DependencyList, // 의존성 배열
  _equals = shallowEquals, // 값을 비교하는 함수
): T {
  const depsRef = useRef<DependencyList | undefined>(undefined); // 의존성 배열을 저장할 ref
  const valueRef = useRef<T | undefined>(undefined); // 계산 결과를 저장할 ref

  const hasNoDeps = !depsRef.current; // 처음 실행하는 경우
  const depsChanged = !_equals(_deps, depsRef.current || []); // 의존성 배열이 변경된 경우

  if (hasNoDeps || depsChanged) {
    valueRef.current = factory(); // 새로운 값을 계산하고 저장
    depsRef.current = _deps; // depsRef를 업데이트해서 다음 비교 준비
  }

  return valueRef.current as T;
}

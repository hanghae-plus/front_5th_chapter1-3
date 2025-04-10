import { DependencyList } from "react";
import { shallowEquals } from "../equalities/shallowEquals";
import { useRef } from "./useRef";
/**
 * 1. 이전 의존성과 결과를 저장할 ref 생성
 * 2. 현재 의존성과 이전 의존성 비교
 * 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
 * 4. 메모이제이션된 값 반환
 * @param factory 메모이제이션할 값을 반환하는 함수
 * @param deps 의존성 배열
 * @param equals 비교 함수
 * @returns 메모이제이션된 값
 */

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (!ref.current || !equals(ref.current.deps, deps)) {
    ref.current = { value: factory(), deps };
    return ref.current.value;
  }

  return ref.current.value;
}

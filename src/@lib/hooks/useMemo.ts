import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDeps = useRef<DependencyList | undefined>(undefined);
  const prevResult = useRef<T | undefined>(undefined);

  // 2. 현재 의존성과 이전 의존성 비교
  if (!prevDeps.current || !_equals(_deps, prevDeps.current)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevResult.current = factory();
    prevDeps.current = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return prevResult.current as T;
}

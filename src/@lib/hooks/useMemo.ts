import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ deps: DependencyList; result: T } | null>(null);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (ref.current === null) {
    ref.current = { deps: _deps, result: factory() };
  }

  // 2. 현재 의존성과 이전 의존성 비교
  if (!_equals(ref.current.deps, _deps)) {
    ref.current = { deps: _deps, result: factory() };
  }

  return ref.current.result;
}

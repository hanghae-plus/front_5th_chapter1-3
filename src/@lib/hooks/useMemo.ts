import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevSavedRef = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  if (!prevSavedRef.current || !_equals(prevSavedRef?.current?.deps, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    prevSavedRef.current = {
      deps: _deps,
      value: factory(),
    };
  }

  return prevSavedRef.current!.value;
}

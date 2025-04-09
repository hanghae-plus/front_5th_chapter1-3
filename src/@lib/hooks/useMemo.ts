import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // 1. 이전 결과를 저장할 ref 생성
  const memoRef = useRef<{
    value?: T;
    deps?: DependencyList;
  }>({
    value: undefined,
    deps: undefined,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  if (!memoRef.current.deps || !equals(memoRef.current.deps, deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    memoRef.current = {
      value: factory(),
      deps,
    };
  }

  // 4. 메모제이션된 값 반환
  return memoRef.current.value as T;
}

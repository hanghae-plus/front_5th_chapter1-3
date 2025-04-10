import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // 이전 의존성과 결과를 저장하는 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    result: T;
  } | null>(null);

  // 의존성이 변경된 경우에만 factory 계산 실행
  if (ref.current === null || !equals(deps, ref.current.deps)) {
    ref.current = {
      deps: deps,
      result: factory(),
    };
  }

  return ref.current.result;
}

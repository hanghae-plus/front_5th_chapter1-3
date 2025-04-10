import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // 이전 의존성과 결과를 저장하기 위한 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    result: T;
    initialized: boolean;
  }>({
    deps: [],
    result: undefined as unknown as T,
    initialized: false,
  });

  // 초기화 또는 deps가 변경되었을 때만 재계산
  const needsRecalculation =
    !ref.current.initialized || !equals(deps, ref.current.deps);

  if (needsRecalculation) {
    // 팩토리 함수 실행 및 결과 저장
    ref.current.result = factory();
    ref.current.deps = deps;
    ref.current.initialized = true;
  }

  return ref.current.result;
}

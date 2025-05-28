import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 이전 상태 저장
  const memoizedValue = useRef<T | null>(null);
  const prevDeps = useRef(_deps);

  // 의존성 비교
  const isDepsSame = _equals(prevDeps.current, _deps);

  // 상태 업데이트
  if (memoizedValue.current === null || !isDepsSame) {
    memoizedValue.current = factory();
    prevDeps.current = _deps;
  }

  return memoizedValue.current;
}

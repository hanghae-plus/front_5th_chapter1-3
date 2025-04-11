import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // Step 1: 이전 deps와 결과를 저장할 ref 만들기
  const cache = useRef<{ deps: DependencyList; value: T } | null>(null);

  // Step 2: 이전 값이 존재하고, deps가 같으면
  if (cache.current?.deps && equals(deps, cache.current.deps)) {
    return cache.current.value;
  }

  // Step 3: 새로 계산하고, 캐시 갱신
  const value = factory();
  cache.current = { deps, value };

  return value;
}

import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // dependency 저장.
  const prevDeps = useRef<DependencyList | null>(null);

  // memoized value를 저장하는 ref
  const memoizedValue = useRef<T>(null as T);

  if (!prevDeps.current || !_equals(prevDeps.current, _deps)) {
    prevDeps.current = _deps;
    memoizedValue.current = factory();
  }

  return memoizedValue.current;
}

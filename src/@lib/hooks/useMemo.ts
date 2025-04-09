/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedDeps = useRef<DependencyList | null>(null);
  const memoizedResult = useRef<T | null>(null);

  if (memoizedDeps.current === null || !_equals(memoizedDeps.current, _deps)) {
    memoizedResult.current = factory();
    memoizedDeps.current = _deps;
  }

  return memoizedResult.current as T;
}

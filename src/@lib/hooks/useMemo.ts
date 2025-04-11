import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  const memoRef = useRef<{
    deps: DependencyList;
    value: T;
    initialized: boolean;
  }>({
    deps: [],
    value: undefined as unknown as T,
    initialized: false,
  });

  const shouldRecompute =
    !memoRef.current.initialized || !equals(memoRef.current.deps, deps);

  if (shouldRecompute) {
    memoRef.current.value = factory();
    memoRef.current.deps = deps;
    memoRef.current.initialized = true;
  }

  return memoRef.current.value;
}

import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoized = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (!memoized.current || !_equals(memoized.current.deps, _deps)) {
    memoized.current = { deps: _deps, value: factory() };
  }

  return memoized.current.value;
}

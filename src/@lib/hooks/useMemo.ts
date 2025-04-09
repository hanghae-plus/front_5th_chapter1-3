import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoized = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (!memoized.current || !_equals(_deps, memoized.current.deps)) {
    memoized.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return memoized.current.value;
}

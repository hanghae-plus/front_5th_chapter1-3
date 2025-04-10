import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoRef = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (memoRef.current === null || !_equals(memoRef.current.deps, _deps)) {
    const value = factory();
    memoRef.current = { deps: [..._deps], value };
    return value;
  }

  return memoRef.current.value;
}

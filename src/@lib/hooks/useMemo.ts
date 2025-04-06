import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoizedRef = useRef<{ value: T; _deps: DependencyList } | null>(null);

  if (
    memoizedRef.current === null ||
    !_equals(memoizedRef.current._deps, _deps)
  ) {
    memoizedRef.current = {
      value: factory(),
      _deps,
    };
  }

  return memoizedRef.current.value;
}

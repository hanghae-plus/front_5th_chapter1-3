import { DependencyList, useRef } from "react";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const prev = useRef<{ value: T; deps: DependencyList }>();

  if (!prev.current || !_equals(prev.current.deps, _deps)) {
    prev.current = {
      value: factory(),
      deps: _deps,
    };
  }

  return prev.current.value;
}

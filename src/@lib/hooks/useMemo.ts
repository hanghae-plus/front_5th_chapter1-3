import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  const memorizedValue = useRef<{ fn: T; deps: DependencyList } | null>(null);
  if (!memorizedValue.current || !_equals(memorizedValue.current.deps, _deps)) {
    memorizedValue.current = {
      fn: factory(),
      deps: _deps,
    };
  }
  return memorizedValue.current.fn;
}

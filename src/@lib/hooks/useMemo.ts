import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals: (a: DependencyList, b: DependencyList) => boolean = shallowEquals,
): T {
  const valueRef = useRef<T | undefined>(undefined);
  const depsRef = useRef<DependencyList>([]);

  if (!depsRef.current.length || !_equals(depsRef.current, _deps)) {
    valueRef.current = factory();
    depsRef.current = _deps;
  }

  return valueRef.current as T;
}

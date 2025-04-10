import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

const UNINITIALIZED = Symbol("UNINITIALIZED");

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const valueRef = useRef<T | typeof UNINITIALIZED>(UNINITIALIZED);
  const dependencyRef = useRef<DependencyList>([]);

  if (
    valueRef.current === UNINITIALIZED ||
    !_equals(dependencyRef.current, _deps)
  ) {
    valueRef.current = factory();
    dependencyRef.current = _deps;
  }

  return valueRef.current as T;
}

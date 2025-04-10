import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export const useMemo = <T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T => {
  const isInitialized = useRef<boolean>(false);
  const value = useRef<T | null>(null);
  const deps = useRef<DependencyList>(_deps);

  if (!isInitialized.current) {
    value.current = factory();
    isInitialized.current = true;
  } else if (!_equals(_deps, deps.current)) {
    deps.current = _deps;
    value.current = factory();
  }

  return value.current as T;
};

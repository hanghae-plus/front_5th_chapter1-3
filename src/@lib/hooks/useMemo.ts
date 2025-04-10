import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const prevDeps = useRef<DependencyList>([]);
  const prevValue = useRef<T | null>(null);
  const isInitialized = useRef<boolean>(true);

  if (isInitialized.current) {
    prevValue.current = factory();
    prevDeps.current = _deps;
    isInitialized.current = false;

    return prevValue.current;
  }
  if (!_equals(prevDeps.current, _deps)) {
    prevValue.current = factory();
    prevDeps.current = _deps;
    isInitialized.current = false;

    return prevValue.current;
  } else {
    isInitialized.current = false;
    return prevValue.current as T;
  }
}

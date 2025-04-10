import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const isInitialized = useRef(false);
  const prevDeps = useRef(_deps);
  const prevResult = useRef<T | null>(null);

  if (!isInitialized.current) {
    prevResult.current = factory();
    prevDeps.current = _deps;
    isInitialized.current = true;

    return prevResult.current;
  }

  if (_equals(prevDeps.current, _deps)) {
    if (prevResult.current === null) {
      prevResult.current = factory();
    }

    return prevResult.current;
  }

  const newResult = factory();
  prevDeps.current = _deps;
  prevResult.current = newResult;

  return newResult;
}

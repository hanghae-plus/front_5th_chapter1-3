import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const savedDeps = useRef<DependencyList | null>(null);
  const savedFactory = useRef<T | null>(null);

  if (savedDeps.current === null || !_equals(savedDeps.current, _deps)) {
    savedFactory.current = factory();
  }

  savedDeps.current = _deps;

  return savedFactory.current as T;
}

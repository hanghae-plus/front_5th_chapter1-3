/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const cache = useRef<{ _deps: DependencyList; value: T } | null>(null);

  if (!cache.current || !_equals(_deps, cache.current._deps)) {
    const value = factory();
    cache.current = { _deps, value };
  }

  return cache.current.value;
}

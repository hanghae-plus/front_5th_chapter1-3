/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const state = useRef<{
    value: T;
    deps: DependencyList;
    factory: () => T;
  } | null>(null);

  if (state.current === null || !_equals(state.current.deps, _deps)) {
    state.current = { value: factory(), deps: _deps, factory };
  }

  return state.current.value;
}

import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

type MemoizedFactory<T> = {
  memoizedValue: T | null;
  memoizedDeps: DependencyList | null;
};

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<MemoizedFactory<T>>({
    memoizedValue: null,
    memoizedDeps: null,
  });

  if (ref.current.memoizedDeps && _equals(ref.current.memoizedDeps, _deps)) {
    return ref.current.memoizedValue as T;
  }

  const value = factory();

  ref.current = {
    memoizedValue: value,
    memoizedDeps: _deps,
  };

  return value;
}

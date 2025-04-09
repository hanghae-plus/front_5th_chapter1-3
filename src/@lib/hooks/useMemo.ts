import { DependencyList } from "react";

import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoized = useRef<[T, DependencyList] | [undefined, undefined]>([
    undefined,
    undefined,
  ]);

  const [prevValue, prevDeps] = memoized.current;

  if (prevDeps && _equals(prevDeps, _deps)) {
    return prevValue;
  }

  const nextValue = factory();
  memoized.current = [nextValue, _deps];
  return nextValue;
}

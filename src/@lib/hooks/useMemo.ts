import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);
  const nextDeps = _deps === undefined ? null : _deps;
  const prevDeps = ref.current?.deps;
  if (
    ref.current === null ||
    prevDeps === null ||
    !_equals(nextDeps, prevDeps)
  ) {
    const value = factory();
    ref.current = { value, deps: nextDeps || [] };
    return value;
  }

  return ref.current.value;
}

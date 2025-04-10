import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const prevDepsRef = useRef<DependencyList | null>(null);
  const prevValueRef = useRef<T | null>(null);

  const isUpdate = !prevDepsRef.current || !_equals(prevDepsRef.current, _deps);

  if (isUpdate) {
    prevDepsRef.current = _deps;
    prevValueRef.current = factory();
  }

  return prevValueRef.current!;
}

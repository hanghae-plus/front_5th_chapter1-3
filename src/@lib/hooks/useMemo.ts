import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {

  let prevDepsRef = useRef<DependencyList | undefined>(undefined);
  let prevResultRef = useRef<T | undefined>(undefined);

  if (prevDepsRef.current === undefined || !equals(prevDepsRef.current, deps)) {
    prevDepsRef.current = deps;
    prevResultRef.current = factory();
  }

  return prevResultRef.current as T;
}

import { DependencyList } from "react";
import { deepEquals } from "../equalities";
import { useRef } from "./useRef";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  const valueRef = useRef<T | undefined>(undefined);
  const depsRef = useRef<DependencyList | undefined>(undefined);

  // 아직 값이 할당 안됐으면, equals 비교 전에 초기화
  if (!depsRef.current?.length) {
    depsRef.current = deps;
    valueRef.current = factory();
  }

  if (!deepEquals(depsRef.current, deps)) {
    depsRef.current = deps;
    valueRef.current = factory();
  }

  return valueRef.current as T;
}

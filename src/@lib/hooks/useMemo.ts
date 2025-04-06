import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memorizedRef = useRef<{ deps: DependencyList; value: T } | null>(null);

  const isInitialRender = memorizedRef.current === null;
  const isDepsChanged = !_equals(memorizedRef.current?.deps, _deps);

  if (isInitialRender || isDepsChanged) {
    memorizedRef.current = { deps: _deps, value: factory() };
  }

  return memorizedRef.current!.value;
}

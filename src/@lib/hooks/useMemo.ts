import type { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const ref = useRef({
    value: undefined as unknown as T,
    deps: [] as DependencyList,
    // initialized === false → 무조건 초기 실행
    initialized: false,
  });

  if (!ref.current.initialized || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
    ref.current.initialized = true;
  }
  return ref.current.value;
}

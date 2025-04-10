import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const memoRef = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  if (memoRef.current === null || !_equals(memoRef.current.deps, _deps)) {
    // 의존성이 처음이거나 바뀐 경우: 계산하고 저장
    memoRef.current = {
      deps: _deps,
      value: factory(),
    };
  }

  return memoRef.current.value;
}

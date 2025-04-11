import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef.ts";

type MemoRef<T> = {
  value: T;
  deps: DependencyList;
};

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const memoRef = useRef<MemoRef<T> | null>(null);

  if (memoRef.current === null || !_equals(memoRef.current.deps, _deps)) {
    const newValue = factory();
    memoRef.current = {
      value: newValue,
      deps: _deps,
    };
  }

  return memoRef.current.value;
}

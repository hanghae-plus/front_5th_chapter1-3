import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./use-ref";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 1. value 로 계산식 저장
  // 2. dependency 변화에 따라 재계산
  const memoRef = useRef<{ value: T; deps: DependencyList } | null>(null);
  if (memoRef.current === null || !_equals(memoRef.current.deps, _deps)) {
    memoRef.current = { value: factory(), deps: _deps };
  }
  return memoRef.current.value;
}

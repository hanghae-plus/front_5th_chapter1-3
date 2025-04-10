import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // ref 초기화: 이전 deps와 값 저장소
  const ref = useRef<{
    deps: DependencyList;
    value: T;
  } | null>(null);

  // 처음 실행이거나 deps가 바뀌었을 경우
  if (ref.current === null || !_equals(ref.current.deps, _deps)) {
    const value = factory();
    ref.current = {
      deps: _deps,
      value,
    };
  }

  // memoized 값 반환
  return ref.current.value;
}

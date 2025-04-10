import { DependencyList } from "react";
import { shallowEquals } from "../equalities"; // Updated to accept DependencyList
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  const memoized = useRef<{ deps: DependencyList; value: T } | null>(null);
  //이전 의존성과 결과를 저장할 ref value가 결과

  if (
    memoized.current &&
    _equals(
      memoized.current.deps as unknown as Record<string, unknown>,
      _deps as unknown as Record<string, unknown>,
    )
  ) {
    //의존성이 변경되지 않은 경우
    return memoized.current.value;
  }

  const value = factory();
  //의존성이 변경된 경우
  memoized.current = {
    deps: _deps,
    value,
  };

  return value;
}

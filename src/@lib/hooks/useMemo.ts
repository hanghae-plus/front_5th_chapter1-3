import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // dependency 저장.
  const prevDeps = useRef<DependencyList | null>(null);

  // memoized value를 저장하는 ref
  // 초기값으로 null을 넣어주지 않으면 factory가 즉시 호출.
  // prevDeps의 current가 null일 때 아래 코드에서 넣어주고 있기 때문에 초기값 null 필요.
  const memoizedValue = useRef<T>(null as T);

  if (!prevDeps.current || !_equals(prevDeps.current, _deps)) {
    prevDeps.current = _deps;
    memoizedValue.current = factory();
  }

  return memoizedValue.current;
}

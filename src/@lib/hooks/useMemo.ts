import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  /**
   * - 의존성의 값들이 변경될 때만 재계산
   * - 매개변수 : calculateValue, dependencies
   * - 초기 랜더링 시에는 인자 없이 calculateValue를 호출한 값 반환
   */
  const ref = useRef({
    value: undefined as T,
    deps: [] as DependencyList,
    initialize: false,
  });

  if (!ref.current.initialize || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
    ref.current.initialize = true;
  }

  return ref.current.value;
}

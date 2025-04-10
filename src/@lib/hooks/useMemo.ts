import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // useRef는 변하지않는 state값 = current 값으로 저장하고 비교하기 좋음
  const current = useRef<{ currentValue: T; deps: DependencyList } | null>(
    null,
  );
  if (!current.current || !_equals(current.current.deps, _deps)) {
    current.current = {
      currentValue: factory(),
      deps: _deps,
    };
  }
  return current.current.currentValue;
}

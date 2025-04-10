import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks/useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const ref = useRef<{ deps: DependencyList; value: T } | null>(null);

  if (ref.current === null) {
    ref.current = { deps: _deps, value: factory() };
  }

  if (!_equals(ref.current.deps, _deps)) {
    ref.current = { deps: _deps, value: factory() };
  }

  return ref.current.value;
}

// useRef가 실행될 때 마다 factory 함수가 실행.
// 따라서, 불필요하게 함수가 계속 실행되는 것을 막기 위해 hook을 최초 호출할 때 null을 넣어준다.
// useMemo는 함수의 결과를 저장, 비용이 큰 계산의 결과를 저장할 수 있다.

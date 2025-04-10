/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  if (ref.current === null) {
    ref.current = {
      value: factory(),
      deps: _deps,
    };

    return ref.current.value;
  }

  // 2. 현재 의존성과 이전 의존성 비교
  if (!_equals(ref.current.deps, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current.value = factory();
    ref.current.deps = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}

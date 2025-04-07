/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);
  // 2. 현재 의존성과 이전 의존성 비교
  if (ref.current === null || !shallowEquals(ref.current.deps, _deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 저장
    ref.current = { value: factory, deps: _deps };
  }
  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}

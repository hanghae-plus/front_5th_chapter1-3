import { DependencyList } from 'react';
import { shallowEquals } from "../equalities";
import { useRef } from './useRef';

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // useRef로 값, 의존성 배열 저장
  // 초기 렌더링 시점에 deps가 빈 배열이어도 정상적으로 동작하도록 inintialized 플래그 추가
  const ref = useRef<{
    value: T | null;
    deps: DependencyList;
    initialized: boolean;
  }>({
    value: null,
    deps: [],
    initialized: false
  })

  // 컴포넌트 마운트 시점에 factory 실행
  if (!ref.current.initialized || !_equals(_deps, ref.current?.deps)) {
    ref.current.value = factory();
    ref.current.deps = _deps;
    ref.current.initialized = true;
  }

  if (ref.current.value === null) {
    throw new Error("useMemo: value is null");
  }

  return ref.current.value;
}

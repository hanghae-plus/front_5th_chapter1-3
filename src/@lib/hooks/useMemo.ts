import { DependencyList, useRef } from "react";
import { shallowEquals } from "../equalities";

/**
 * 의존성 배열 변경에 따른 메모제이션 훅
 *
 * @param factory - 계산할 값을 반환하는 함수
 * @param deps - 의존성 배열 ->  이 값이 변경되면 factory 함수가 다시 실행
 * @param equals - 의존성 비교에 사용할 함수( 기본값은 얕은 비교 )
 * @returns 메모이제이션 된 값
 */
interface MemoState<T> {
  deps: DependencyList;
  value: T;
  initialized: boolean;
}

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals
): T {
  const ref = useRef<MemoState<T>>({
    deps: [],
    value: undefined as unknown as T,
    initialized: false,
  });

  // 의존성 변경 여부 확인
  const depsChanged =
    !ref.current.initialized || !equals(deps, ref.current.deps);

  // 의존성 변경 or no 초기화 -> 다시 계산
  if (depsChanged) {
    ref.current.deps = deps;
    ref.current.value = factory();
    ref.current.initialized = true;
  }

  return ref.current.value;
}

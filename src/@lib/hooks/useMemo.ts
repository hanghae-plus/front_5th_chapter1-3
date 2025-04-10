import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T, //메모이제이션 할 값을 계산하는 함수. 첫 번째 렌더링 시에는 initialized가 false이므로 항상 factory 함수 실행
  _deps: DependencyList, //의존성 배열. 이 값들이 변경되면 factory함수를 재실행.
  _equals = shallowEquals, //의존성 비교 방법을 정의하는 함수. 기본값은 얕은 비교
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    deps: DependencyList;
    value: T;
    initialized: boolean;
  }>({
    deps: [],
    value: undefined as unknown as T,
    initialized: false,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const isDepsChanged =
    !ref.current.initialized || !_equals(_deps, ref.current?.deps);
  //initialized 플래그 : useMemo 함수가 이전에 한 번이라도 실행되었는지 추적

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (isDepsChanged) {
    ref.current.deps = _deps;
    ref.current.value = factory();
    ref.current.initialized = true;
  }
  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}

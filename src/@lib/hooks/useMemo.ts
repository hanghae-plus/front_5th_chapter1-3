import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "react";

/**
 * useMemo 훅은 의존성 배열이 변경되지 않는 한 동일한 값을 반환하여 성능 최적화를 돕는다.
 * @param factory  // 계산할 값을 만드는 함수
 * @param _deps   // 의존성 배열
 * @param _equals // 의존성 비교 함수 (기본값: 얕은 비교)
 * @returns
 */
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // ref를 사용하여 이전 의존성과 계산된 값을 저장
  const ref = useRef<{
    value: T; // 메모이제이션된 값
    deps: DependencyList; // 이전 의존성 배열
    initialized: boolean; // 초기화 여부 플래그
  }>({
    value: undefined as unknown as T, // 처음에는 값이 없으므로 타입 강제 설정
    deps: [], // 이전 의존성 초기값
    initialized: false, // 아직 초기화되지 않음
  });

  // 처음 실행되었거나, 의존성 배열이 변경되었으면 factory 재실행
  if (!ref.current.initialized || !_equals(ref.current.deps, _deps)) {
    ref.current.value = factory(); // 새로운 값을 계산
    ref.current.deps = _deps; // 현재 의존성을 저장
    ref.current.initialized = true; // 초기화 완료 표시
  }

  // useMemo 훅은 메모이제이션된 값을 반환합니다.
  // 직접 작성한 useRef를 통해서 만들어보세요.
  return ref.current.value;
}

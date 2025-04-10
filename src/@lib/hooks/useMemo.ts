import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// 메모이제이션된 값 저장하는 객체의 타입
interface MemoRef<T> {
  deps: DependencyList; // 의존성 배열
  value: T; // 계산된 값
  initialized: boolean; // 초기화 여부
}

/**
 * 의존성 배열이 변경되었을 때만 계산 함수를 재실행하여 성능 최적화
 * @param factory 메모이제이션할 값을 계산하는 함수
 * @param _deps 의존성 배열로 이 배열의 값이 변경되면 factory 함수가 재실행
 * @param _equals 의존성 배열을 비교하는 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 계산 값
 */
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  const initialValue: MemoRef<T> = {
    deps: [],
    value: undefined as T,
    initialized: false,
  };

  // 렌더링 간 유지되는 객체 생성
  const ref = useRef<MemoRef<T>>(initialValue);

  // 1. 아직 초기화되지 않았거나(첫 번째 렌더링 시)
  const isInitialized = ref.current.initialized;

  // 2. 의존성 배열이 변경되었을 때 (_equals 함수로 비교)
  const isDepsChanged = !_equals(_deps, ref.current.deps);

  if (!isInitialized || isDepsChanged) {
    // 1) 현재 의존성 배열을 복제하여 저장 (배열 길이 변경 문제 해결)
    ref.current.deps = [..._deps];
    // 2) factory 함수 실행하여 새 값 계산 및 저장
    ref.current.value = factory();
    // 초기화 완료 표시
    ref.current.initialized = true;
  }

  return ref.current.value;
}

import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);

  // console.log('ref', ref);
  // 2. 현재 의존성과 이전 의존성 비교
  // 최초 current가 null 인 상태 혹은 current의 의존성 배열이 서로 같이 않은 상태(얕은 비교)
  if (ref.current === null || !equals(ref.current.deps, deps)) {
    // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
    ref.current = { value: factory(), deps: deps };
  }
  // 4. 메모이제이션된 값 반환
  return ref.current.value;
}

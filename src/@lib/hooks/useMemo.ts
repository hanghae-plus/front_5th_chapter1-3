import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const depsRef = useRef<DependencyList | null>(null);
  const valueRef = useRef<T | null>(null);

  // 2. 현재 의존성과 이전 의존성 비교
  const isSame = depsRef.current !== null && _equals(depsRef.current, _deps);

  // 3. 의존성이 변경되었거나 최초 렌더링인 경우만 factory 함수 실행
  // 렌더링 시점에 if 문 실행, deps 는 같지만
  // mockFactory() 는 반환값이 undefined 이기 때문에 valueRef.current 는 항상 undefined 일 수 밖에 없다.
  if (
    !isSame ||
    (valueRef.current === undefined && depsRef.current === undefined)
  ) {
    // 값 메모이제이션
    valueRef.current = factory();
    // 현재 의존성 저장
    depsRef.current = _deps;
    console.log("depsRef.current", depsRef.current);
  }

  // 4. 메모이제이션된 값 반환
  return valueRef.current as T;
}

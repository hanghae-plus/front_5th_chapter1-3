import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// useMemo 는 재렌더링 사이에 계산 결과를 캐싱할 수 있게 해주는 React Hook 입니다.
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  // 2. 현재 의존성과 이전 의존성 비교
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  // 4. 메모이제이션된 값 반환

  const ref = useRef<{ _deps: DependencyList; result: T } | null>(null);
  if (ref.current === null) {
    ref.current = {
      _deps,
      result: factory(),
    };
  }
  // 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (!_equals(ref.current._deps, _deps)) {
    ref.current.result = factory();
    ref.current._deps = _deps;
  }
  return ref.current.result;
}

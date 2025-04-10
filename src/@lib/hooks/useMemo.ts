import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

// 다만 React.memo의 경우엔 어디다 결과를 저장해두고 반환한다기 보다는 Props와 State가 같으면 굳이 렌더링을 하지 않는 형태로 구현하는 겁니다.
// useMemo 훅은 계산 비용이 높은 값을 메모이제이션합니다.
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요! 이게 제일 중요합니다.

  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const ref = useRef<{
    value: T | undefined;
    deps: DependencyList | undefined;
  }>({
    value: undefined,
    deps: undefined,
  });

  // 2. 현재 의존성과 이전 의존성 비교
  const hasChanged = !ref.current.deps || !_equals(ref.current.deps, _deps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (hasChanged) {
    ref.current.value = factory();
    ref.current.deps = _deps;
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value as T;
}

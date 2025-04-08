import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  //이전값, 의존성배열, 결과를 저장할 ref (렌더링 사이에 값을 유지하기 위함.)
  const ref = useRef<{
    deps: DependencyList | undefined;
    value: T | undefined;
  }>({
    deps: undefined,
    value: undefined,
  });
  //처음에는 무조건 팩토리 함수를 실행 의존성이 변경될 경우
  const isChanged = !ref.current.deps || !_equals(ref.current.deps, _deps);

  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (isChanged) {
    ref.current = { deps: _deps, value: factory() };
  }

  // 4. 메모이제이션된 값 반환
  return ref.current.value as T;
}

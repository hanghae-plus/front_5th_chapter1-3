import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // useRef를 사용하여 이전 값과 의존성을 저장
  // 이전 렌더에서 저장해둔 값
  const ref = useRef<{
    value: T | undefined;
    deps: DependencyList | undefined;
  }>({
    value: undefined,
    deps: undefined,
  });

  console.log("ref.current: ", ref.current.deps);
  console.log("deps: ", deps);

  // 초기 실행이거나 의존성이 변경된 경우
  if (ref.current.deps === undefined || !equals(deps, ref.current.deps)) {
    // 새 값 계산 및 저장
    console.log("새 값 계산");
    const value = factory();
    console.log("value: ", value);
    ref.current = {
      value,
      deps,
    };
    return value;
  }

  // 의존성이 변경되지 않은 경우, 이전 값 반환
  return ref.current.value as T;
}

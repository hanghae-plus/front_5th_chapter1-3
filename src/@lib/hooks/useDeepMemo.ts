/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equalities";

/**
 * useMemo 훅을 확장한 커스텀 훅
 * 의존성 배열(deps)을 깊은 비교(deepEquals)로 확인
 */
export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps, deepEquals);
  /**
   * useMemo는 참조 동등성(reference equality)만 확인하기 때문에
   * 객체나 배열이 같은 내용을 가졌더라도 참조가 다르면 메모이제이션된 값을 재계산하는 반면
   *
   * useDeepMemo는 deepEquals 함수를 사용해 의존성 배열의 내용을 깊게 비교하므로,
   * 객체나 배열의 내용이 실제로 변경되었을 때만 재계산합니다.
   * 이 훅은 복잡한 객체나 배열을 의존성으로 가질 때 불필요한 재렌더링을 방지하는 데 유용합니다.
   */
}

import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { deepEquals } from "../equalities";

/**
 * 1. useMemo를 사용하되, 비교 함수로 deepEquals를 사용
 * @param factory 메모이제이션할 값을 반환하는 함수
 * @param deps 의존성 배열
 * @returns 메모이제이션된 값
 */

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // 직접 작성한 useMemo를 참고해서 만들어보세요.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, deps, deepEquals);
}

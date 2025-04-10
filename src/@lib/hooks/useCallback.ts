/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

/**
 * 의존성 배열이 변경되지 않는 한 동일한 함수 참조를 유지하는 훅
 * @param factory 메모이제이션할 함수
 * @param _deps 의존성 배열 (이 값들이 변경될 때만 새 함수 참조 생성)
 * @returns 메모이제이션된 함수
 */
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, _deps);
}

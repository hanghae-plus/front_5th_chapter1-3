/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  /** 캐싱할 함수 */
  factory: T,
  /** factory 함수에서 사용되는 모든 값들 */
  _deps: DependencyList,
) {
  const memorizedFactory = useMemo(() => factory, _deps);
  return memorizedFactory as T;
}

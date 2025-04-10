/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

/**
 * 컴포넌트 렌더링 시 함수 재생성 방지
 */
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  return useMemo(() => factory, _deps);
}

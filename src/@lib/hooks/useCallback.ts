import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
): T {
  // useMemo를 사용하여 callback을 메모이제이션
  // 의존성 배열이 변경되지 않으면 동일한 함수 참조를 유지
  return useMemo(() => callback, deps);
}

import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: unknown[]) => unknown>(
  factory: T,
  deps: DependencyList,
): T {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, deps);
}
// (...args: any[]) 함수의 형태
// T extends (...args: any[])  T는 함수여야만 한다

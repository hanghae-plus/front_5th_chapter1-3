import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends (...args: unknown[]) => unknown>(
  factory: T,
  deps: DependencyList,
): T {
  return useMemo(() => factory, deps);
}

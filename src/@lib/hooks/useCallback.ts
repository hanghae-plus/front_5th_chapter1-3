import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  return useMemo(() => factory, _deps);
}

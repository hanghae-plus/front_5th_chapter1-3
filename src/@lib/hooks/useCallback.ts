/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList, useMemo } from "react";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, _deps);
}

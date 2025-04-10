/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo.ts";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // useMemo를 사용하여 callback 함수를 메모이제이션
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, _deps);
}

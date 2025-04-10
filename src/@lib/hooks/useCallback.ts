/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  // useMemo를 사용해 콜백 함수를 메모이제이션
  return useMemo(() => callback, deps, equals);
}

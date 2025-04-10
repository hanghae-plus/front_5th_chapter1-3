/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  //`() =>factory`해서 함수 자체를 리턴
  const memo = useMemo(() => factory, _deps);
  return memo as T;
}

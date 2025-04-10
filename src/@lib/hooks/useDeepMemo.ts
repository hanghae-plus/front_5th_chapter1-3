/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { deepEquals } from "../equalities";
import { useMemo } from "./useMemo";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // // 1. useMemo를 사용하되, 비교 함수로 deepEquals를 사용
  return useMemo(factory, deps, deepEquals);
}

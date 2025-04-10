/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
): T {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return useMemo(() => factory, _deps, shallowEquals);
}

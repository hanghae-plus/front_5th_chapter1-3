/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.

  // useMemo를 그대로 쓰면 React의 ESLint 규칙이 적용된다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps, shallowEquals);
}

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const prevFactory = useRef<T | undefined>(undefined);
  const prevDeps = useRef<DependencyList | undefined>(undefined);

  if (!shallowEquals(prevDeps.current, _deps)) {
    prevFactory.current = factory;
    prevDeps.current = _deps;
  }

  // 직접 작성한 useMemo를 통해서 만들어보세요.
  return prevFactory.current;
}

import { DependencyList } from "react";
import { deepEquals } from "../equalities";
import { useRef } from "./useRef";

export function useDeepMemo<T>(factory: () => T, deps: DependencyList): T {
  // 직접 작성한 useMemo를 참고해서 만들어보세요.
  const pervDeps = useRef<null | DependencyList>(null);
  const prevFactory = useRef<null | T>(null);

  const isEqual = deepEquals(pervDeps.current, deps);
  if (!isEqual) {
    pervDeps.current = deps;
    prevFactory.current = factory();
  }

  return prevFactory.current as T;
}

// 이걸로는 왜 안되죠?
// return useMemo(factory, deps, deepEquals);

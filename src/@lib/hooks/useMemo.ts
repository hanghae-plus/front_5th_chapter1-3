/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  // 참조값 _deps 가 변경되면 factory함수를 다시 생성한다.

  const prevDeps = useRef<null | DependencyList>(null);
  const prevFactory = useRef<null | T>(null);

  const isEqual = shallowEquals(prevDeps.current, _deps);
  if (!isEqual) {
    prevDeps.current = _deps;
    prevFactory.current = factory();
  }

  return prevFactory.current as T;
}

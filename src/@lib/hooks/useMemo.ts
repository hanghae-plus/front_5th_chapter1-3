import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals,
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.

  // myRef.current에 넣은 객체 값이 들어감
  const myRef = useRef<{
    value: T;
    deps: DependencyList;
    initialized: boolean;
  }>({
    value: undefined as T, // factory 실행 전이라 아직 T의 값을 모름
    deps: [],
    initialized: false,
  });

  if (!myRef.current.initialized || !_equals(myRef.current.deps, _deps)) {
    myRef.current.value = factory();
    myRef.current.deps = _deps;
    myRef.current.initialized = true;
  }

  return myRef.current.value;
}

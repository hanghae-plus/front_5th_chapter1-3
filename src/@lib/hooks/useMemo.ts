/* eslint-disable @typescript-eslint/no-unused-vars */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 직접 작성한 useRef를 통해서 만들어보세요.
  const memoRef = useRef<{
    deps: DependencyList;
    value: T;
    initialized: boolean;
  }>({
    deps: [],
    value: undefined as unknown as T,
    initialized: false, // 처음 렌더인지 확인하는 플래그
  }); // deps와 value를 기억하는 객체 -> useRef를 이용해서 컴포넌트가 리랜더링되더라도 같은 참조를 유지함

  // console.log("memoRef", memoRef);

  if (!memoRef.current.initialized || !_equals(memoRef.current.deps, _deps)) {
    memoRef.current.value = factory(); //deps가 바뀌었으면 factory()를 실행해서 value를 다시 계산하고 저장
    memoRef.current.deps = _deps;
    memoRef.current.initialized = true;
  }

  return memoRef.current.value;
}

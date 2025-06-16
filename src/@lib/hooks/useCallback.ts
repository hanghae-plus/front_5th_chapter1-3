/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback: 의존성이 변경되면 함수 실행
// 1. useMemo에서 의존성, 함수 비교
// 2. useMemo에서 함수 반환
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const memorizedFunc = useMemo(() => factory, _deps);

  return memorizedFunc;
}

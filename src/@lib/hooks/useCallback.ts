/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback은 리렌더링 간에 함수 정의를 캐싱해 주는 React Hook입니다.
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // useMemo를 사용하여 함수를 메모이제이션하되, 의존성 배열의 크기가 변경되지 않도록 합니다.
  return useMemo(() => factory, [..._deps]);
}

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  // useMemo와 useCallback의 차이는 사실 메모이제이션을 하는 대상이 함수냐 값이냐일 뿐.
  // 따라서 메모이제이션을 하고자 하는 대상에 함수를 넣어주면 됨.
  const memoizedCallback = useMemo(() => factory, _deps);
  return memoizedCallback as T;
}

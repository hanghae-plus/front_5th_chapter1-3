/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

// useCallback 은 의존성이 바뀌지 않는다면 함수를 그대로 리턴.
// 결국 함수도 하나의 참조값이 라고 생각하면 useMemo 와 동일한 로직일 것
// useMemo는 실행할 함수를 인자로 받아서 그 값을 기억하므로, 함수 참조값을 반환하는 함수를 인자로 사용하여 참조값을 캐싱
export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  const memoizedFunction = useMemo(() => factory, _deps);

  return memoizedFunction as T;
}

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";

export function useCallback<T extends Function>(
  factory: T,

  _deps: DependencyList,
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  //factory 함수와 같은 Deps를 useMemo에 전달
  //함수 자체를 메모이제이션 하기!
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => factory, _deps);
}

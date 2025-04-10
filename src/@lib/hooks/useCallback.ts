/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList } from "react";
import { useMemo } from "../hooks/useMemo";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  return useMemo(() => factory, _deps);
}

// useCallback은 함수 자체를 저장한다.
// dependency는 hook 안에서 사용하는 외부값, 해당 값이 바뀌면 hook을 다시 동작하게 만든다.
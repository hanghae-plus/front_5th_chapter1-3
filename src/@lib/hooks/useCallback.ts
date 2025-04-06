/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useRef } from "./useRef";
import { shallowEquals } from "../equalities";

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList,
) {
  const memoizedRef = useRef<{ callback: T; _deps: DependencyList } | null>(
    null,
  );

  if (
    memoizedRef.current === null ||
    !shallowEquals(memoizedRef.current._deps, _deps)
  ) {
    memoizedRef.current = {
      callback: factory,
      _deps,
    };
  }

  return memoizedRef.current.callback;
}

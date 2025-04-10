/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useMemo } from "./useMemo.ts";

export function useCallback<T extends Function>(
  factory: T,
  deps: DependencyList,
  equals = shallowEquals,
): T {
  return useMemo(() => factory, deps, equals);
}

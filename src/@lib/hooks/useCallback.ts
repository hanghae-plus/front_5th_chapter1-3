/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { useMemo } from "./useMemo";
import { shallowEquals } from "../equalities";

export const useCallback = <T extends Function>(
  callback: T,
  _deps: DependencyList,
) => {
  return useMemo(() => callback, _deps, shallowEquals);
};

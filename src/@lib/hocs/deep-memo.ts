import { ComponentType } from "react";
import { deepEquals } from "../equalities/index.ts";
import { memo } from "./memo.ts";

export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return memo(Component, deepEquals);
}

import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { memo } from "./memo.ts";

export function deepMemo<P extends Record<string, unknown>>(
  Component: ComponentType<P>,
) {
  return memo(Component, deepEquals);
}

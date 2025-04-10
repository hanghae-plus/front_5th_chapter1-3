import { deepEquals } from "../equalities";
import { ComponentType } from "react";
import { memo } from "./memo";

export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return memo(Component, deepEquals);
}

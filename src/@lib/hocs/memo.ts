/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { ComponentType, memo as ReactMemo} from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals,
) {

  return ReactMemo(Component, (prevProps, nextProps) => {
    return equals(prevProps, nextProps);
  });
}

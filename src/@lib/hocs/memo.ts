/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { FunctionComponent } from "react";

export function memo<P extends object>(
  Component: FunctionComponent<P>,
  _equals = shallowEquals,
) {
  let prevProps: P | null = null;
  let prevResult = null;

  return function (props: P) {
    if (prevProps !== null && _equals(prevProps, props)) {
      return prevResult!;
    }

    prevProps = props;
    prevResult = Component({ ...props });
    return prevResult;
  };
}

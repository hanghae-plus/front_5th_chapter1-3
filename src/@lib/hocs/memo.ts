/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
import { FunctionComponent, ReactNode, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: FunctionComponent<P>,
  equals = shallowEquals
) {
  return function MemoizedComponent(props: P): ReactNode {
    const previous = useRef<{
      props: P;
      result: ReactNode;
    } | null>(null);

    let shouldRender = true;
    if (previous.current && equals(previous.current.props, props)) {
      shouldRender = false;
    }

    if (shouldRender) {
      previous.current = {
        props,
        result: createElement(Component, props),
      };
    }

    return previous.current!.result;
  };
}

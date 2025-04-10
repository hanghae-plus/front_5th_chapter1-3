import { FunctionComponent } from "react";
import { useRef } from "../hooks";
import { shallowEquals } from "../equalities";

export function memo<P extends object>(
  Component: FunctionComponent<P>,
  equals = shallowEquals,
) {
  return function MemoizedComponent(
    props: P,
  ): ReturnType<FunctionComponent<P>> {
    const prevRef = useRef<{
      props: P;
      result: ReturnType<FunctionComponent<P>>;
    } | null>(null);

    if (!prevRef.current || !equals(prevRef.current.props, props)) {
      prevRef.current = {
        props,
        result: Component(props),
      };
    }

    return prevRef.current.result;
  };
}

import { shallowEquals } from "../equalities";
import { ComponentType, ReactElement } from "react";
import { useRef } from "../hooks/useRef";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return (props: P) => {
    const prevProps = useRef<P | null>(null);
    const MemoizedComponent = useRef<ReactElement | null>(null);

    if (!prevProps.current || !_equals(prevProps.current, props)) {
      prevProps.current = props;
      MemoizedComponent.current = <Component {...props} />;
    }

    return MemoizedComponent.current;
  };
}

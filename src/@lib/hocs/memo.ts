import { ComponentType, createElement, ReactElement } from "react";
import { shallowEquals } from "../equalities";
import { useMemo, useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 직접만든 훅으로 구현
  return (props: P) => {
    const prev = useRef<{ props: P; result: ReactElement } | null>(null);
    const result = useMemo(() => {
      if (prev.current && _equals(prev.current.props, props)) {
        return prev.current.result;
      }
      const result = createElement(Component, props);
      prev.current = { props, result };
      return prev.current.result;
    }, [props]);
    return result;
  };
}

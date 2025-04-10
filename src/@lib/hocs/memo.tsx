import { shallowEquals } from "../equalities";
import type { ComponentType, ReactNode } from "react";
import { useRef } from "../hooks";

export const memo = <P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) => {
  const MemoizedComponent = (props: P) => {
    const isFirstRenderRef = useRef(true);
    const memoizedPropsRef = useRef({});
    const memoizedComponentRef = useRef<ReactNode | null>(null);

    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      memoizedPropsRef.current = props;
      memoizedComponentRef.current = <Component {...props} />;
    }

    if (!_equals(memoizedPropsRef.current, props)) {
      memoizedPropsRef.current = props;
      memoizedComponentRef.current = <Component {...props} />;
    }

    return memoizedComponentRef.current;
  };

  return MemoizedComponent;
};

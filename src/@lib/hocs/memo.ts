import React, { ComponentType } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

/**
 * 최초
 */
// export function memo<P extends object>(
//   Component: ComponentType<P>,
//   _equals = shallowEquals
// ) {
//   let prevProps: P | null = null;
//   let prevResult: JSX.Element;

//   return function MemoizedComponent(nextProps: P) {
//     if (_equals(prevProps, nextProps)) {
//       return prevResult;
//     }

//     prevProps = nextProps;
//     prevResult = React.createElement(Component, nextProps);
//     return prevResult;
//   };
// }

/**
 * 개선
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  return function MemoizedComponent(nextProps: P) {
    const prevPropsRef = useRef<P>(null);
    const prevResultRef = useRef<JSX.Element>(null);

    if (_equals(prevPropsRef.current, nextProps)) {
      return prevResultRef.current;
    }

    prevPropsRef.current = nextProps;
    prevResultRef.current = React.createElement(Component, nextProps);
    return prevResultRef.current;
  };
}

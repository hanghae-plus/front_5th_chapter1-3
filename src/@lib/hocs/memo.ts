import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let prevProps: P;
  let prevElem: React.ReactElement;

  return function MemoizedComponent(newProps: P) {
    if (_equals(prevProps, newProps)) return prevElem;

    const newElem = createElement(Component, newProps);
    prevProps = newProps;
    prevElem = newElem;
    return newElem;
  };
}

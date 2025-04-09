import { ComponentType, createElement } from "react";

import { shallowEquals } from "../equalities";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let memoized: [React.ReactElement, P] | [undefined, undefined] = [
    undefined,
    undefined,
  ];

  return (props: P) => {
    const [prevElement, prevProps] = memoized;
    if (prevProps && _equals(prevProps, props)) {
      return prevElement;
    }

    const element = createElement(Component, props);

    memoized = [element, props];

    return element;
  };
}

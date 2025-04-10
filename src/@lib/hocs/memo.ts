import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const memo: { element: React.ReactElement | null; props: P | null } = {
    element: null,
    props: null,
  };

  return function memoized(props: P) {
    if (memo.props && _equals(memo.props, props)) {
      return memo.element;
    }

    const element = createElement(Component, props);

    memo.element = element;
    memo.props = props;

    return element;
  };
}

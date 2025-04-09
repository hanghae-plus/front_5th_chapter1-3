import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoComponent = (props: P) => {
    const propsRef = useRef<P | null>(null);
    const componentRef = useRef<React.ReactElement>(
      createElement(Component, props),
    );

    if (
      !propsRef.current ||
      !componentRef.current ||
      !_equals(propsRef.current, props)
    ) {
      propsRef.current = props;
      componentRef.current = createElement(Component, props);
    }
    return componentRef.current;
  };
  return MemoComponent;
}

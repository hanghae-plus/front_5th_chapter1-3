import { shallowEquals } from "../equalities";
import React, { ComponentType } from "react";

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  let memoizedProps: P | null = null;
  let MemoizedComponent: React.ReactElement | null = null;

  const updateComponent = (props: P) => {
    memoizedProps = props;
    MemoizedComponent = React.createElement(Component, props);
  };

  const WrappedComponent = (props: P) => {
    if (!MemoizedComponent) {
      updateComponent(props);
      return MemoizedComponent;
    }

    if (_equals(props, memoizedProps)) {
      return MemoizedComponent;
    }

    updateComponent(props);
    return MemoizedComponent;
  };

  return WrappedComponent;
}

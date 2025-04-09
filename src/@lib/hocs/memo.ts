import React from "react";
import { useMemo } from "../hooks/useMemo";
import { shallowEquals } from "../equalities";

type CompareFunction<P> = (prevProps: P, nextProps: P) => boolean;

export function memo<P extends object>(
  Component: React.ComponentType<P>,
  compare?: CompareFunction<P>,
): React.ComponentType<P> {
  return (props: P) => {
    const factory = () => React.createElement(Component, props);
    return useMemo(factory, [props], (prevDeps, nextDeps) => {
      return compareDeps<P>(prevDeps, nextDeps, compare);
    });
  };
}

function compareDeps<P>(
  prevDeps: React.DependencyList,
  nextDeps: React.DependencyList,
  compare?: CompareFunction<P>,
): boolean {
  const prevProps = prevDeps[0] as P;
  const nextProps = nextDeps[0] as P;
  if (compare) return compare(prevProps, nextProps);

  return shallowEquals(prevProps, nextProps);
}

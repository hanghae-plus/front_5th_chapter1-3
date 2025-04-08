/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-unsafe-function-type */
import { DependencyList } from 'react';
import { useRef } from './useRef';
import { shallowEquals } from '../equalities';

export function useCallback<T extends Function>(
  factory: T,
  _deps: DependencyList
) {
  // 직접 작성한 useMemo를 통해서 만들어보세요.
  const ref = useRef<{ value: T; deps: DependencyList } | null>(null);
  if (ref.current === null || !shallowEquals(ref.current.deps, _deps)) {
    ref.current = { value: factory, deps: _deps };
  }
  return ref.current.value;
}

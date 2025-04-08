import { useSyncExternalStore } from 'react';

type Listener = () => void;

export const create = <T>(initialValue: T) => {
  let state = initialValue;
  const listeners = new Set<Listener>();

  const getState = () => state;

  const setState = (partial: Partial<T> | ((prev: T) => Partial<T>)) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const useStore = (selector = (state: T) => state) => {
    return useSyncExternalStore(subscribe, () => selector(getState()));
  };

  return {
    getState,
    setState,
    subscribe,
    useStore,
  };
};

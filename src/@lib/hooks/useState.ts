import { shallowEquals } from "../equalities";

type SetStateAction<T> = T | ((prevState: T) => T);
type Dispatch<T> = (value: T) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let state: any = undefined;

/**컴포넌트에 state 변수를 추가할 수 있는 리액트 훅 */
export function useState<T>(
  initialState: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] {
  //section1: state를 정의합니다.
  if (state === undefined) {
    state =
      typeof initialState === "function"
        ? (initialState as () => T)()
        : initialState;
  }

  //section2: setState를 정의합니다.
  const setState: Dispatch<SetStateAction<T>> = (nextStateUpdater) => {
    const nextState =
      typeof nextStateUpdater === "function"
        ? (nextStateUpdater as (prevState: T) => T)(state)
        : nextStateUpdater;

    if (shallowEquals(state, nextState)) {
      console.warn("setState로 들어온 매개변수가 동일합니다");
      return;
    }

    state = nextState;
    //TODO: 해당 라인에 리렌더링을 시킬 수 있도록 합니다.
    //TODO: 여러 state를 관리할 수 있게 구현
  };

  return [state, setState];
}

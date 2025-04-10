/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { DependencyList } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "./useRef";

/**
 * 의존성 배열이 변경되었을 때만 함수를 재생성하는 메모이제이션 훅
 *
 * @param callback - 메모이제이션할 콜백 함수
 * @param deps - 의존성 배열 -> 이 값들이 변경되면 콜백 함수가 다시 생성
 * @param equals - 의존성 비교에 사용할 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 콜백 함수
 */

interface CallbackState<T extends Function> {
  deps: DependencyList;
  callback: T;
  initialized: boolean;
}

export function useCallback<T extends Function>(
  callback: T,
  deps: DependencyList,
  equals = shallowEquals
) {
  // 이전 의존성과 콜백 함수를 저장하기 위한 ref 생성
  const ref = useRef<CallbackState<T>>({
    deps: [],
    callback: callback,
    initialized: false,
  });

  // 의존성 변경 여부 확인
  const depsChanged =
    !ref.current.initialized || !equals(deps, ref.current.deps);

  // 의존성 변경 or no 초기화 -> 콜백 업데이트
  if (depsChanged) {
    ref.current.deps = deps;
    ref.current.callback = callback;
    ref.current.initialized = true;
  }

  return ref.current.callback;
}

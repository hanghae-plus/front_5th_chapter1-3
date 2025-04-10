// path: ~/Develop/front_5th_chapter1-3/src/@lib/hooks/useRef.ts

import { useState } from "react";

// useRef는 React에서 값을 저장할 수 있는 Hook입니다.
// - 컴포넌트가 리렌더링되어도 ref 객체는 동일하게 유지됩니다.
// - ref.current에 값을 저장할 수 있으며, 이 값은 바뀌어도 리렌더링되지 않습니다.
// - 주로 DOM 요소 접근, 렌더링 간 값 유지, 이전 값 추적 등에 사용됩니다.

/**
 * @template T T는 이 함수에서 사용될 타입 변수입니다.
 * @param {T} initialValue 초기값. T 타입을 가집니다.
 * @returns {{ current: T }} current 속성을 가진 객체를 반환합니다.
 *
 * @example
 * const ref = useRef<number>(0);
 * <number> 라는 제네릭 타입은 추론 하므로 생략 가능
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>({ current: initialValue });
  return ref;
}

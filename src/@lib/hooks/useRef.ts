import { useState } from "react";

/**
 * 렌더링간에 값을 유지하는 가변 참조 객체 생성
 * 참조 값이 변경되어도 컴포넌트를 리렌더링 하지 X
 *
 * @param initialValue - 초기 참조 값
 * @returns current 속성을 가진 객체로, 렌더링 사이에도 지속되는 참조
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>(() => {
    return { current: initialValue };
  });

  return ref;
}

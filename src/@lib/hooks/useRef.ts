import { useState } from "react";

/**
 * useRef 훅
 * 렌더링 사이에 값을 유지할 수 있는 변경 가능한 레퍼런스(참조) 생성
 * current 속성을 통해 값에 접근하고 변경할 수 있게 함.
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [value] = useState({ current: initialValue });
  return value;
}

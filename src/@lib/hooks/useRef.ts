import { useState } from "react";

/**
 * @param initialValue - ref 객체의 초기값
 * @returns current 속성을 가진 객체 {current: T}
 */
export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.

  // useState를 사용해 {current: initialValue} 형태의 객체를 생성
  // 구조 분해 할당으로 state 값만 사용하고 setter는 사용하지 않음
  const [ref] = useState({ current: initialValue });

  // 생성된 ref 객체 반환
  return ref;
}

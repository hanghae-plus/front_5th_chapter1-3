import { useState } from "react";

// useRef 함수의 타입 정의
interface RefObject<T> {
  current: T;
}

/**
 * useState를 사용한 useRef 구현
 * @param initialValue - 초기값
 * @returns RefObject - { current: value } 형태의 객체
 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<RefObject<T>>({ current: initialValue });
  return ref;
}

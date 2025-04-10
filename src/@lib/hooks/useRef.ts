import { useState } from "react";

/** 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState({ current: initialValue });
  return ref;
}

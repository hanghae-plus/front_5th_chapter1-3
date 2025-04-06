import { useState } from "react";

/** ref의 lazy initialization 사용 */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}

// TODO: useState없이 구현해보기

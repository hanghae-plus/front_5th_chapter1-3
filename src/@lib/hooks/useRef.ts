import { useState } from "react";

/**useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref객체를 생성합니다. */
export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>({ current: initialValue });

  return ref;
}

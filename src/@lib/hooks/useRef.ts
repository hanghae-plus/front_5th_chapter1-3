import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.

  // 내가 알고 있는 ref
  // 1. 값을 참조함
  // 2. 리렌더링을 유발하면 안됨
  // callback ref는?

  const [ref] = useState({
    current: initialValue,
  });

  return ref;
}

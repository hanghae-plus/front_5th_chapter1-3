import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState({ current: initialValue });
  return ref;
}

// useRef & useState는 상태를 저장하고 관리
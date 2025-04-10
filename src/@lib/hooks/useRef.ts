import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [refValue] = useState({ current: initialValue });
  return refValue;
}

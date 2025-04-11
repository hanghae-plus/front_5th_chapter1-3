import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  const [ref] = useState<{ current: T }>(() => {
    return { current: initialValue };
  });
  return ref;
}

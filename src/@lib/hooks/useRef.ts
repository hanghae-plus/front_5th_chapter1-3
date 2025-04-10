import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  //Lazy Initialization 최초 렌더에서 딱 한 번만 실행됨
  const [ref] = useState(() => ({ current: initialValue }));

  return ref;
}

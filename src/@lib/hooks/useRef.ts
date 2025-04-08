import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  //동일한 참조객체 유지, setter 함수는 사용되지 않아 참조를 유지하면서 current 값을 변경해도
  //리렌더링을 유발하지 않습니다.
  const [ref] = useState<{ current: T }>({ current: initialValue });

  return ref;
}

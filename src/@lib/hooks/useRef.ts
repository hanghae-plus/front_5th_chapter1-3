import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.
  // 초기에 할당하고? 수정되더라도 기존값이 보존되기 위해 읽기전용...
  const [state] = useState({ current: initialValue });
  return state;
}

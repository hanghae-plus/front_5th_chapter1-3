import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 컴포넌트의 첫 렌더링에서만 초깃값 사용
  // 컴포넌트의 생명주기 동안 같은 객체 유지
  // 리렌더링시에는 이전에 생성한 객체 반환
  const [ref] = useState({ current: initialValue });

  return ref;
}

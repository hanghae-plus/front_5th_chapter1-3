import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // 내부적으로 값을 기억하기 위한 mutable한 객체를 생성해주는 훅
  // current값을 바꿔도 리렌더리이 되지않아야함
  // setState를 호출하지 않아서 리렌더링 X
  const [ref] = useState(() => ({ current: initialValue }));
  return ref;
}

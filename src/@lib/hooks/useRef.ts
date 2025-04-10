import { useState } from "react";

/**
 * useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성
 */
export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.

  // react에서 state가 변했는지 check 하는 방식이 얕은 비교로 참조값이 달라져야 리랜더링이 이뤄짐.
  // 객체 안의 값을 직접 수정하면 리랜더링이 일어나지 않음 ex. { current: 1 } -> { current : 2 }
  const [ref] = useState({ current: initialValue });

  return ref;
}

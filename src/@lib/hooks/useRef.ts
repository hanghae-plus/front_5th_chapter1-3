import { useState } from "react";

/**
 *
 * @param initialValue
 * @returns
 */
// TODO: 함수 오버라이딩
// useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
export function useRef<T>(initialValue: T): { current: T } {
  // 상태를 업데이트할 필요가 없기 때문에 setState 함수를 사용하지 않음.
  // useState 를 직접 사용하지 않고 useState(() => {}) 로 함수를 전달하면 컴포넌트 마운트 시, 한번만 실행
  const [ref] = useState<{ current: T }>(() => {
    return { current: initialValue };
  });
  // 생성된 ref 객체는 리렌더링 시에도 유지됨. ref.current 값을 변경해도 리렌더링을 트리거하지 않음.
  return ref;
}

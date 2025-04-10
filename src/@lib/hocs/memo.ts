import { shallowEquals } from "../equalities";
import { ComponentType, createElement } from "react";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 2. 메모이제이션된 컴포넌트 생성
  const MemoizedComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevPropsRef = useRef<P | null>(null); // 이전에 사용한 props 값
    const resultRef = useRef<any>(null); // 이전에 렌더링한 결과

    // 3. equals 함수를 사용하여 props 비교
    let shouldRender = true;

    if (prevPropsRef.current !== null) {
      // 이전 props가 있으면
      if (_equals(prevPropsRef.current, props)) {
        // props가 같으면
        shouldRender = false; // 리렌더링 X
      }
    }

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (shouldRender) {
      prevPropsRef.current = { ...props }; // 현재 props 저장
      resultRef.current = createElement(Component, props); // 새로 렌더링 ?
    }

    return resultRef.current;
  };

  return MemoizedComponent;
}

import { ComponentType, createElement } from "react";
import { shallowEquals } from "../equalities";
import { useRef } from "../hooks";

// memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  const MemoizedComponent = (props: P) => {
    // 1. 이전 props를 저장할 ref 생성
    const prevProps = useRef<P | null>(null);

    // 2. 메모이제이션된 컴포넌트 생성
    const memoizedComponent = createElement(Component, props);

    // 3. equals 함수를 사용하여 props 비교
    const isShouldUpdate =
      !prevProps.current || !_equals(prevProps.current, props);

    // 4. props가 변경된 경우에만 새로운 렌더링 수행
    if (isShouldUpdate) {
      prevProps.current = props;
    }

    return isShouldUpdate ? memoizedComponent : null;
  };

  return MemoizedComponent;
}

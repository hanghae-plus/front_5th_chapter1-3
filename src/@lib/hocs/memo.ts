import { shallowEquals } from "../equalities";
import { ComponentType, createElement, ReactNode } from "react";
import { useRef } from "../hooks";

/** * memo HOC는 컴포넌트의 props를 얕은 비교하여 불필요한 리렌더링을 방지합니다.
 * @param Component
 * @param [_equals=shallowEquals]
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  return function MemoizedComponent(props: P): ReactNode {
    const prevPropsRef = useRef<P | null>(null); // 이전 props 저장
    const renderRef = useRef<ReactNode | null>(null); // 이전 렌더 결과 저장

    const shouldRender =
      !prevPropsRef.current || !_equals(prevPropsRef.current, props);

    if (shouldRender) {
      prevPropsRef.current = props;
      renderRef.current = createElement(Component, props); // JSX 대신 createElement 사용
    }

    return renderRef.current;
  };
}

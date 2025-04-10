import { shallowEquals } from "../equalities";
import { ComponentType, createElement, useRef, ReactElement } from "react";

/**
 * props가 변경되지 않으면 컴포넌트의 리렌더링을 방지하는 HOC
 * @param Component 메모이제이션할 원본 컴포넌트
 * @param equals props 비교에 사용할 비교 함수 (기본값: shallowEquals)
 * @returns 메모이제이션된 새 컴포넌트
 *
 *  forwardRef를 사용하여 ref를 전달할 수 있도록 구현하고 싶었으나 타입 추론이 어려워 포기 ㅠㅠ./..
 */
export function memo<P extends object>(
  Component: ComponentType<P>,
  equals = shallowEquals
) {
  return function MemoizedComponent(props: P) {
    const propsRef = useRef<P | null>(null); // 이전 props 저장
    const componentRef = useRef<ReactElement | null>(null); // 마지막 렌더링 컴포넌트 저장

    // 렌더링 필요 여부 확인
    // 1. 첫 렌더링이거나 props가 변경된 경우
    // 2. 키 개수가 다른 경우
    // 3. 키 값이 다른 경우
    const shouldRender =
      propsRef.current === null ||
      !equals(propsRef.current, props) ||
      Object.keys(propsRef.current).length !== Object.keys(props).length;

    // 렌더링이 필요한 경우에만 새 컴포넌트 생성
    if (shouldRender) {
      propsRef.current = props; // 현재 props 저장
      componentRef.current = createElement(Component, props); // 새 컴포넌트 생성
    }

    return componentRef.current; // 현재 또는 이전 렌더링 결과 반환
  };
}

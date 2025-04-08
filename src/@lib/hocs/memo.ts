/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from '../equalities';
import { ComponentType, createElement, ReactNode } from 'react';

export function memo<P extends object>(
  Component: ComponentType<P>,
  _equals = shallowEquals
) {
  // 클로저를 사용하여 이전 상태 유지
  let prevProps: P;
  let prevElement: ReactNode;

  /**
   * 메모이제이션된 컴포넌트를 반환하는 함수
   */
  return function MemoizedComponent(props: P) {
    // 이전 props와 비교
    if (prevProps && _equals(prevProps, props)) {
      return prevElement;
    }

    // props가 변경되었거나 처음 렌더링일 때
    const element = createElement(Component, props);
    prevProps = props;
    prevElement = element;
    return element;
  };
}

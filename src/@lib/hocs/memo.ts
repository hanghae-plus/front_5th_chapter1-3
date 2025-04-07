/* eslint-disable @typescript-eslint/no-unused-vars */
import { shallowEquals } from "../equalities";
//  React 컴포넌트의 타입을 정의할 때 사용하는 제네릭 타입
// 컴포넌트가 받을 수 있는 props 타입을 자동으로 추론해주는 유용한 타입
import React, {ComponentType, ReactElement} from "react";

// 현재 jsx를 자동변환해주는 것이 없어 사용 x
// function renderComponent<P>(Component: ComponentType<P>, props: P) {
//   return <Component {...props} />;
// }

/**
 * 컴포넌트 자체를 메모이제이션
 * prevProps, prevElement를 클로저를 사용하여 외부에서 접근 불가하도록
 */
export function memo<P extends object | null>(
  Component: ComponentType<P>,
  _equals = shallowEquals,
) {
  // 1. 이전 props를 저장할 ref 생성
  let prevProps: P | null = null;
  let prevElement: ReactElement;

  // 2. 메모이제이션된 컴포넌트 생성 함수 리턴
  return function MemoizedComponent(props: P | null) {
    // console.log('prevElement', prevElement);

    // console.log('prevProps', prevProps);
    // console.log('props', props);

    // 2-1. equals 함수를 사용하여 props 비교
    if (_equals(prevProps, props)) {
      return null;
    }

    // 2-2. props가 변경된 경우에만 새로운 렌더링 수행
    const element = React.createElement(Component, props);
    // console.log('element', element);

    prevProps = props;
    prevElement = element;
    return element;
  };
}

import { deepEquals } from "../equalities";
import { ComponentType, memo as reactMemo } from "react";

/**
 * memo와 동일하게 컴포넌트 메모이제이션
 * - React의 기본 memo를 사용하되, 깊은 비교(deepEquals) 함수 적용
 * - 중첩된 객체나 배열의 내용까지 재귀적으로 비교
 * - 객체의 참조가 달라도 내용이 같으면 동일한 것으로 판단
 */
export function deepMemo<P extends object>(Component: ComponentType<P>) {
  return reactMemo(Component, deepEquals);
}

/**
 * 차이점 요약
 * - memo: 얕은 비교 (객체 참조만 비교)
 * - deepMemo: 깊은 비교 (객체 내부 값까지 재귀적으로 비교)
 * 성능:
 * - memo: 빠르지만 참조가 다른 객체는 항상 다른 것으로 간주
 * - deepMemo: 더 정확하지만 깊은 비교로 인한 성능 비용 발생 가능
 * 사용 사례:
 * - memo: 간단한 props나 기본 타입을 사용하는 컴포넌트에 적합
 * - deepMemo: 복잡한 객체나 배열을 props로 전달하는 컴포넌트에 유용
 */

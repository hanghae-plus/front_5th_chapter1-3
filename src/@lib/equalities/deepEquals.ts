import { isArray, isObject } from "./utils";

// 1. 기본 타입이거나 null인 경우 처리

// 2. 둘 다 객체인 경우:
//    - 배열인지 확인
//    - 객체의 키 개수가 다른 경우 처리
//    - 재귀적으로 각 속성에 대해 deepEquals 호출

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입이거나 null인 경우
  if (objA == null || objB == null) {
    return objA === objB;
  }

  // 배열
  if (isArray(objA) && isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    // 중첩된 배열 비교
    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  // 객체
  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA) as (keyof T)[];
    const keysB = Object.keys(objB) as (keyof T)[];

    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every((key) => deepEquals(objA[key], objB[key]));
  }

  return objA === objB;
}

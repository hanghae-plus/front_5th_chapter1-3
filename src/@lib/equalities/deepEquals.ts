import { isObject } from "../../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Object.keys(objA as object).length !== Object.keys(objB as object).length)
    return false;

  for (const key in objA) {
    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}

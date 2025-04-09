import { isArray, isObject } from "./utils";

// 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
// 2. 둘 중 하나라도 객체가 아닌 경우 처리
// 3. 객체의 키 개수가 다른 경우 처리
// 4. 모든 키에 대해 얕은 비교 수행

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  // 배열
  if (isArray(objA) && isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value, index) => objB[index] === value);
  }
  // 객체
  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every((key) => objB[key] === objA[key]);
  }
  return objA === objB;
}

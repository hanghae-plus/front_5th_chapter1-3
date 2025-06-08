import { isObject } from "../../utils.ts";

// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 배열인 경우: 길이와 각 요소가 같은지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, index) => objB[index] === item);
  }

  // 3. 객체인 경우: 키 개수와 각 키의 값이 같은지 확인
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    // 3-1. 키 개수가 다르면
    if (entriesA.length !== entriesB.length) {
      return false;
    }

    // 3-2. 각 키에 대해 값이 같은지
    return entriesA.every(([key, value]) => objB[key] === value);
  }

  return objA === objB;
}

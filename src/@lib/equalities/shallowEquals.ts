import { isArray, isObject } from "../../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 값들
  if (objA === objB) {
    return true;
  }

  // 배열
  if (isArray(objA) && isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, index) => value === objB[index]);
  }

  // 객체
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(([key, value]) => value === objB[key]);
  }
  return false;
}

import { isObject } from "../utils/typeCheck.ts";

export function equals<T>(
  objA: T,
  objB: T,
  compare: (a: unknown, b: unknown) => boolean,
): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((_, i) => compare(objA[i], objB[i]));
  }

  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => compare(objA[key], objB[key]));
  }

  return objA === objB;
}

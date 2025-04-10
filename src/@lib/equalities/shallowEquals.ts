import { isObject } from "./objUtils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((value, index) => objB[index] === value);
  }

  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => objB[key] === objA[key]);
  }

  return false;
}

import { isObject } from "../../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) {
      return false;
    }

    if (!Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

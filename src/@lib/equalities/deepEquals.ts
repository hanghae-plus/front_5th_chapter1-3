import { isObject } from "../../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);
  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((val, i) => deepEquals(val, objB[i]));
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;

    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}

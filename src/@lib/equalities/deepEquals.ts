import { isObject } from "../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return arrayDeepEquals(objA as unknown[], objB as unknown[]);
  }

  if (!isObject(objA) || !isObject(objB)) return false;

  return objectDeepEquals(objA, objB);
}

function arrayDeepEquals<T>(arrA: T[], arrB: T[]): boolean {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i++) {
    if (!deepEquals(arrA[i], arrB[i])) return false;
  }
  return true;
}

function objectDeepEquals(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (key in objB === false) return false;
    if (!deepEquals(objA[key], objB[key])) return false;
  }
  return true;
}

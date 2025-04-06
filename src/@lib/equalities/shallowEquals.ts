import { isObject } from "../utils";

export function shallowEquals<T>(a: T, b: T): boolean {
  if (a === b) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    return arrayShallowEquals(a, b);
  }

  if (isObject(a) && isObject(b)) {
    return objectShallowEquals(a, b);
  }

  return false;
}

function arrayShallowEquals<T>(arrA: T[], arrB: T[]): boolean {
  if (arrA.length !== arrB.length) return false;
  for (let i = 0; i < arrA.length; i++) {
    if (arrA[i] !== arrB[i]) return false;
  }
  return true;
}

function objectShallowEquals(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}

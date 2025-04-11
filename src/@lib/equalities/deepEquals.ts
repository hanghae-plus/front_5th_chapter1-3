import { isNonNullObject } from "./isNonNullObject";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return _deepEqualsArray(objA, objB);
  }

  if (isNonNullObject(objA) && isNonNullObject(objB)) {
    return _deepEqualsObject(
      objA as Record<string, unknown>,
      objB as Record<string, unknown>,
    );
  }

  return objA === objB;
}

function _deepEqualsArray(arrA: unknown[], arrB: unknown[]): boolean {
  if (arrA.length !== arrB.length) return false;
  return arrA.every((itemA, index) => deepEquals(itemA, arrB[index]));
}

function _deepEqualsObject(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(objA[key], objB[key]),
  );
}

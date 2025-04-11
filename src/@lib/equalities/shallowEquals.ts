import { isNonNullObject } from "./isNonNullObject";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return _shallowEqualsArray(objA, objB);
  }

  if (isNonNullObject(objA) && isNonNullObject(objB)) {
    return _shallowEqualsObject(
      objA as Record<string, unknown>,
      objB as Record<string, unknown>,
    );
  }

  return objA === objB;
}

function _shallowEqualsArray(arrA: unknown[], arrB: unknown[]): boolean {
  if (arrA.length !== arrB.length) return false;
  return arrA.every((itemA, index) => itemA === arrB[index]);
}

function _shallowEqualsObject(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      objA[key] === objB[key],
  );
}

import { isNull, isPrimitive, isObject } from "../typeValidation";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) {
    return true;
  }

  if (isNull(objA) || isNull(objB)) {
    return false;
  }

  if (isPrimitive(objA) || isPrimitive(objB)) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value: unknown, key: number) =>
      deepEquals(value, objB[key]),
    );
  }

  // 객체 비교
  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => deepEquals(objA[key], objB[key]));
}

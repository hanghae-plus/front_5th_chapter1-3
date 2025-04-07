import { isNull, isPrimitive, isObject } from "../typeValidation";

export function shallowEquals<T>(objA: T, objB: T): boolean {
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

    return objA.every((value: unknown, key: number) => objB[key] === value);
  }

  // 객체 비교
  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  const entriesA: [string, unknown][] = Object.entries(objA);
  const entriesB: [string, unknown][] = Object.entries(objB);

  return (
    entriesA.length === entriesB.length &&
    entriesA.every(([key, value]: [string, unknown]) => {
      return objB[key] === value;
    })
  );
}

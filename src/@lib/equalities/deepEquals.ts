import { isObject } from "../../validators";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, key) => deepEquals(value, objB[key]));
  }

  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    return (
      entriesA.length === entriesB.length &&
      entriesA.every(([key, value]) => deepEquals(value, objB[key]))
    );
  }

  return false;
}

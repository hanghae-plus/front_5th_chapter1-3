import { isObject } from "../../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((value, key) => deepEquals(objB[key], value));
  }

  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    if (entriesA.length !== entriesB.length) return false;
    return entriesA.every(([key, value]) => deepEquals(objB[key], value));
  }

  return false;
}

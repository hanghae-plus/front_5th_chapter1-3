import { isArray, isObject } from "../../utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // Primitive values
  if (objA === objB) {
    return true;
  }

  // Array
  if (isArray(objA) && isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  // Object
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    if (entriesA.length !== entriesB.length) {
      return false;
    }

    return entriesA.every(([key, value]) => deepEquals(value, objB[key]));
  }
  return false;
}

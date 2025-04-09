import { isRecord } from "../utils/isRecord";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (!objA || !objB) return objA === objB;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((a, index) => deepEquals(a, objB[index]));
  }

  if (isRecord(objA) && isRecord(objB)) {
    return deepEqualsRecord(objA, objB);
  }

  return objA === objB;
}

function deepEqualsRecord(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
) {
  const aKeys = Object.keys(objA);
  const bKeys = Object.keys(objB);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => deepEquals(objA[key], objB[key]));
}

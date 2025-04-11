import { isRecord } from "../utils/isRecord";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((item, index) => item === objB[index]);
  }

  if (isRecord(objA) && isRecord(objB)) {
    return shallowEqualsRecord(objA, objB);
  }

  return false;
}

function shallowEqualsRecord(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  return aKeys.every((key) => a[key] === b[key]);
}

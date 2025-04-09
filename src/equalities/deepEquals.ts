import { isObject } from "./isObject";

function areArraysEqual(a: unknown[], b: unknown[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, index) => deepEquals(item, b[index]));
}

function areObjectsEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => key in b && deepEquals(a[key], b[key]));
}

export function deepEquals(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;

  if (Array.isArray(a) && Array.isArray(b)) {
    return areArraysEqual(a, b);
  }

  if (isObject(a) && isObject(b)) {
    return areObjectsEqual(a, b);
  }

  return false;
}

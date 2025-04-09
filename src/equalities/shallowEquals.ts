import { isObject } from "./isObject";

function haveSameKeys(a: object, b: object): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  return keysA.length === keysB.length;
}

function areShallowValuesEqual(
  a: Record<string, unknown>,
  b: Record<string, unknown>
): boolean {
  return Object.keys(a).every((key) => key in b && Object.is(a[key], b[key]));
}

export function shallowEquals(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;

  if (!isObject(a) || !isObject(b)) return false;

  if (!haveSameKeys(a, b)) return false;

  return areShallowValuesEqual(a, b);
}

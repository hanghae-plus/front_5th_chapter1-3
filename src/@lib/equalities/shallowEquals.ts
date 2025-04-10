import { equals } from "./equals.ts";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  return equals(objA, objB, (a, b) => a === b);
}

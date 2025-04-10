import { equals } from "./equals.ts";

export function deepEquals<T>(objA: T, objB: T): boolean {
  return equals(objA, objB, deepEquals);
}

import { baseEquals } from "./baseEquals";

export function deepEquals<T>(objA: T, objB: T): boolean {
  return baseEquals(objA, objB, deepEquals);
}

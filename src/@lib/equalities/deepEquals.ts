import { isPrimitiveValue } from "@/utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (
    isPrimitiveValue(objA) ||
    isPrimitiveValue(objB) ||
    objA === null ||
    objB === null
  ) {
    return objA === objB;
  }
  if (typeof objA === "object" && typeof objB === "object") {
    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) return false;
      return objA.every((item, index) => deepEquals(item, objB[index]));
    }
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    return Object.keys(objA).every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }
  return objA === objB;
}

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (
    objA === undefined ||
    objB === undefined ||
    objA === null ||
    objB === null
  )
    return objA === objB;
  if (typeof objA === "object" && typeof objA === typeof objB) {
    /** 배열일 떄 */
    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) return false;
      return objA.every((item, index) => deepEquals(item, objB[index]));
    }
    /** 객체일 떄 */
    const keysA = Object.keys(objA) as (keyof T)[];
    const keysB = Object.keys(objB) as (keyof T)[];

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => deepEquals(objA[key], objB[key]));
  }

  return objA === objB;
}

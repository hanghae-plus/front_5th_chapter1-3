export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (objA === null || objB === null) return false;

  if (typeof objA !== typeof objB) return false;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA) as (keyof T)[];
    const keysB = Object.keys(objB) as (keyof T)[];

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
      if (!deepEquals(objA[key], objB[key])) return false;
    }

    return true;
  }
  return objA === objB;
}

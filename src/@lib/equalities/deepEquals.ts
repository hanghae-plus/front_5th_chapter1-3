const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (objA === null || objB === null) return objA === objB;

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, i) => deepEquals(item, objB[i]));
  }

  if (isObject(objA) && isObject(objB)) {
    const aKeys = Object.keys(objA);
    const bKeys = Object.keys(objB);
    if (aKeys.length !== bKeys.length) return false;

    return aKeys.every((key) => deepEquals(objA[key], objB[key]));
  }

  return false;
}

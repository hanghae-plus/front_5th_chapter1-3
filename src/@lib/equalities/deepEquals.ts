const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === "object" && object !== null;
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((value, i) => deepEquals(value, objB[i]));
  }

  if (isObject(objA) && isObject(objB)) {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);

    if (objAKeys.length !== objBKeys.length) {
      return false;
    }

    return objAKeys.every((key) => deepEquals(objA[key], objB[key]));
  }

  return false;
}

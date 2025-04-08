export function deepEquals<T>(objA: T, objB: T): boolean {
  if (!objA || !objB) {
    return objA === objB ? true : false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 1. length check
    if (objA.length !== objB.length) return false;

    // 2. 요소 하나하나 check
    for (let i = 0; i < objA.length; i++) {
      if (typeof objA[i] === "object" || typeof objB[i] === "object") {
        return deepEquals(objA[i], objB[i]);
      }
      if (objA[i] !== objB[i]) {
        const isBothEmpty =
          Object.keys(objA).length === 0 && Object.keys(objB).length === 0;
        const isBothNull = objA === null && objB === null;
        const isBothUndefined = objA === undefined && objB === undefined;
        if (!isBothEmpty && !isBothNull && !isBothUndefined) return false;
      }
    }

    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    // 1. length check
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }

    // 2. 요소 하나하나 check
    for (const key in objA) {
      if (typeof objA[key] === "object" || typeof objB[key] === "object") {
        return deepEquals(objA[key], objB[key]);
      }
      if (objA[key] !== objB[key]) {
        return false;
      }
    }
    return true;
  }
  return objA === objB;
}

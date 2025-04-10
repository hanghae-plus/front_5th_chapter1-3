export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (objA === null || objB === null || typeof objA !== typeof objB) {
    return false;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    if (Array.isArray(objA) !== Array.isArray(objB)) {
      return false;
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) {
        return false;
      }

      for (let i = 0; i < objA.length; i++) {
        if (!deepEquals(objA[i], objB[i])) {
          return false;
        }
      }

      return true;
    }

    const keyA = Object.keys(objA);
    const keyB = Object.keys(objB);

    if (keyA.length !== keyB.length) {
      return false;
    }

    for (const key of keyA) {
      if (
        !(key in objB) ||
        !deepEquals(objA[key as keyof T], objB[key as keyof T])
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
}

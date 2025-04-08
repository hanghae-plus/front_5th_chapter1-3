export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (!objA || !objB) {
    return objA === objB ? true : false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) return false;
    }

    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    for (const key in objA) {
      if (objA[key] !== objB[key]) return false;
    }

    return true;
  }
  return objA === objB;
}

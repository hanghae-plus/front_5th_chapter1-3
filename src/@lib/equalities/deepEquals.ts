export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  //배열
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (typeof objA[i] === "object" && typeof objB[i] === "object") {
        return deepEquals(objA[i], objB[i]);
      }

      if (objA[i] != objB[i]) {
        return false;
      }
    }
    return true;
  }

  //객체
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (typeof objA[key] === "object" && typeof objB[key] === "object") {
      return deepEquals(objA[key], objB[key]);
    }
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    ) {
      return false;
    }
  }

  return true;
}

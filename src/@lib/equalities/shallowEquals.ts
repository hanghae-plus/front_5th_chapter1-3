export function shallowEquals<T extends Record<string, unknown>>(
  objA: T,
  objB: T,
): boolean {
  if (objA === objB) {
    console.log("shallowEquals: same reference");
    return true;
  }

  if (
    (typeof objA === "string" && typeof objB === "string") ||
    (Array.isArray(objA) && Array.isArray(objB))
  ) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) return false;
    }
    return true;
  }

  if (
    objA !== null &&
    objB !== null &&
    typeof objA === "object" &&
    typeof objB === "object"
  ) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    console.log("objA:", objA, objB);
    for (const key of keysA) {
      if (objA[key] !== objB[key]) return false;
    }
    return true;
  }

  return objA === objB;
}

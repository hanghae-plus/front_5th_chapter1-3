export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;
  if (typeof objA !== typeof objB) return false;
  if (typeof objA !== "object" || objA === null || objB === null) {
    return false;
  }
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    const a = objA as Record<string, unknown>;
    const b = objB as Record<string, unknown>;
    if (!(key in b)) return false;
    if (!deepEquals(a[key], b[key])) return false;
  }

  return true;
}

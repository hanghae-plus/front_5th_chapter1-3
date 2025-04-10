export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (objA === null || objB === null) return false;
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (const key of keysA) {
    if (!deepEquals(objA[key as keyof T], objB[key as keyof T])) return false;
  }
  return true;
}

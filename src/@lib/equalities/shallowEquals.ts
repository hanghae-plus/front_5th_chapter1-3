export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    return objA.every((x, i) => x === objB[i]);
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!(key in objB)) return false;
    if (objA[key as keyof T] !== objB[key as keyof T]) return false;
  }
  return true;
}

export function shallowEquals<T>(objA: T, objB: T): boolean {

  if (objA === objB) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (
      !objB.hasOwnProperty(key) ||
      (objA as any)[key] !== (objB as any)[key]
    ) {
      return false;
    }
  }

  return true;
}
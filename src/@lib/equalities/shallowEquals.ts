export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;
    return objA.every((val, idx) => val === objB[idx]);
  }

  const a = objA as Record<string, unknown>;
  const b = objB as Record<string, unknown>;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) => Object.prototype.hasOwnProperty.call(b, key) && a[key] === b[key],
  );
}

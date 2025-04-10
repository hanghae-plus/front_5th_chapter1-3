export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Object.is(objA, objB)) return true;

  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    const arrA = objA as unknown[];
    const arrB = objB as unknown[];

    return (
      arrA.length === arrB.length &&
      arrA.every((val, i) => deepEquals(val, arrB[i]))
    );
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    deepEquals(
      (objA as Record<string, unknown>)[key],
      (objB as Record<string, unknown>)[key],
    ),
  );
}

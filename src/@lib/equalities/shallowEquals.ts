export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

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
      arrA.length === arrB.length && arrA.every((val, i) => val === arrB[i])
    );
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    Object.is(objA[key as keyof T], objB[key as keyof T]),
  );
}

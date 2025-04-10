export function deepEquals<T>(objA: T, objB: T): boolean {
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
    return objA.every((x, i) => deepEquals(x, objB[i]));
  }

  const keys = new Set([...Object.keys(objA), ...Object.keys(objB)]);

  for (const key of keys) {
    const valueA = objA[key as keyof T];
    const valueB = objB[key as keyof T];

    const isBothObjects =
      typeof valueA === "object" &&
      typeof valueB === "object" &&
      valueA !== null &&
      valueB !== null;

    if (isBothObjects) {
      if (!deepEquals(valueA, valueB)) return false;
    } else {
      if (valueA !== valueB) return false;
    }
  }

  return true;
}

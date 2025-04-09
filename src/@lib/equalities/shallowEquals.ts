export function shallowEquals<T>(objA: T, objB: T): boolean {
  const isObject = (obj: unknown): obj is Record<string, unknown> => {
    return obj !== null && typeof obj === "object";
  };
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((value, index) => objB[index] === value);
  }

  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    if (entriesA.length !== entriesB.length) return false;
    return entriesA.every(([key, value]) => objB[key] === value);
  }

  return objA === objB;
}

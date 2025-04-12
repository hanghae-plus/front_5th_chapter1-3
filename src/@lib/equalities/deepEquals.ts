const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    if (entriesA.length !== entriesB.length) return false;
    return entriesA.every(([key, value]) => deepEquals(value, objB[key]));
  }

  return objA === objB;
}

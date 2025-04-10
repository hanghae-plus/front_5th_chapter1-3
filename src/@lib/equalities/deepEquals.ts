function areDeeplySameArrays(arrA: unknown[], arrB: unknown[]): boolean {
  if (arrA.length !== arrB.length) {
    return false;
  }
  return arrA.every((item, index) => deepEquals(item, arrB[index]));
}

function areDeeplySameObjects(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  return objAKeys.every((key) => {
    return deepEquals(objA[key], objB[key]);
  });
}

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (objA === null || objB === null) {
    return objA === objB;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return areDeeplySameArrays(objA, objB);
  }

  if (typeof objA === "object" && typeof objB === "object") {
    return areDeeplySameObjects(objA, objB);
  }

  return objA === objB;
}

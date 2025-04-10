function areSameArrays<T>(arrA: T[], arrB: T[]): boolean {
  if (arrA.length !== arrB.length) {
    return false;
  }

  let sameValue = true;
  arrA.forEach((item, index) => {
    if (item !== arrB[index]) {
      sameValue = false;
    }
  });

  return sameValue;
}

function areSameObjects(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
): boolean {
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  let sameValue = true;
  objAKeys.forEach((key) => {
    if (objA[key] !== objB[key]) {
      sameValue = false;
    }
  });
  return sameValue;
}

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA !== typeof objB) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    return areSameArrays(objA, objB);
  }

  if (objA === null || objB === null) {
    return objA === objB;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    return areSameObjects(
      objA as Record<string, unknown>,
      objB as Record<string, unknown>,
    );
  }

  return objA === objB;
}

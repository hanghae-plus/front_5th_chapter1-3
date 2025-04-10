const isObjet = (object: unknown): object is Record<string, unknown> => {
  return typeof object === "object" && object !== null;
};

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((val, i) => val === objB[i]);
  }

  if (isObjet(objA) && isObjet(objB)) {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    return Object.keys(objA).every((key) => objA[key] === objB[key]);
  }

  return false;
}

import { getIsObject } from "./common";

const getIsSameArray = (arrA: unknown[], arrB: unknown[]) => {
  const isSameLength = arrA.length === arrB.length;
  const isSameAllValues = arrA.every((value, index) => {
    if (getIsObject(arrB[index])) {
      if (!getIsObject(value)) return false;
      return deepEquals(arrB[index], value);
    }
    return arrB[index] === value;
  });
  return isSameLength && isSameAllValues;
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    const flattenA = objA.flat(Infinity);
    const flattenB = objB.flat(Infinity);
    return getIsSameArray(flattenA, flattenB);
  }

  if (getIsObject(objA) && getIsObject(objB)) {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);
    const isSameLength = objAKeys.length === objBKeys.length;
    const isSameAllValues = objAKeys.every((key) => {
      if (getIsObject(objA[key])) {
        if (!getIsObject(objB[key])) return false;
        return deepEquals(objA[key], objB[key]);
      }

      if (Array.isArray(objA[key])) {
        if (!Array.isArray(objB[key])) return false;
        return deepEquals(objA[key], objB[key]);
      }

      return objA[key] === objB[key];
    });
    return isSameLength && isSameAllValues;
  }

  return objA === objB;
}

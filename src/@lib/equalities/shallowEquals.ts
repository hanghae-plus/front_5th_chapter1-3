import { getIsObject } from "./common";

const getIsSameArray = (arrA: unknown[], arrB: unknown[]) => {
  const isSameLength = arrA.length === arrB.length;
  const isSameAllValues = arrA.every((value, index) => arrB[index] === value);
  return isSameLength && isSameAllValues;
};

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return getIsSameArray(objA, objB);
  }

  if (getIsObject(objA) && getIsObject(objB)) {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);
    const isSameLength = objAKeys.length === objBKeys.length;
    const isSameAllValues = objAKeys.every((key) => objA[key] === objB[key]);
    return isSameLength && isSameAllValues;
  }

  return objA === objB;
}

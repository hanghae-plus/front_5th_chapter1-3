import { isObjectType } from "./util";

export function deepEquals<T>(objA: T, objB: T): boolean {
  const isArray = Array.isArray(objA) && Array.isArray(objB);

  if (isArray) {
    if (objA.length !== objB.length) return false;

    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  const isObject = isObjectType(objA) && isObjectType(objB);

  if (isObject) {
    const firstParamKeys = Object.keys(objA);
    const secondParamKeys = Object.keys(objB);

    if (firstParamKeys.length !== secondParamKeys.length) return false;

    return firstParamKeys.every((key) => deepEquals(objA[key], objB[key]));
  }

  return objA === objB;
}

import { isArray, isObject } from "../../utils/utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 원시값일 경우
  if (!isObject(objA) && !isObject(objB)) {
    return Object.is(objA, objB);
  }

  // 배열일 경우
  if (isArray(objA) && isArray(objB)) {
    if (objA.length === objB.length) {
      return objA.every((value, index) => value === objB[index]);
    }
    return false;
  }
  //객체라면
  const objAKeys = Object.keys(objA as object);
  const objBKeys = Object.keys(objB as object);
  //객체의 키 개수가 다른 경우 처리
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }
  // 모든 키에 대해 얕은 비교 수행
  for (const key of objAKeys) {
    if (!Object.hasOwnProperty.call(objB, key)) {
      return false;
    }
  }
  // 각 키의 값이 같은지 확인
  for (const key of objAKeys) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }
  return true;
}

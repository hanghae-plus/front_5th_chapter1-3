import { isObjectPair } from "../../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  //1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리

  if (!isObjectPair(objA, objB)) {
    return false;
  }
  const keyA = Object.keys(objA as object);
  const keyB = Object.keys(objB as object);

  // 3. 객체의 키 개수가 다른 경우 처리
  if (keyA.length !== keyB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  return keyA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      objA[key as keyof T] === objB[key as keyof T],
  );
}

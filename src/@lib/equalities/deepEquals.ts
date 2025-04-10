import { isArray, isObject } from "../../utils/utils";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은 경우 true 반환
  if (objA === objB) {
    return true;
  }

  // objA과 objB가 모두 배열이고, 길이가 같은 경우 각 요소를 비교
  if (isArray(objA) && isArray(objB) && objA.length === objB.length) {
    return objA.every((v, k) => deepEquals(v, objB[k]));
  }

  // objA과 objB가 모두 객체이고, 각 속성들을 비교
  if (isObject(objA) && isObject(objB)) {
    const key1 = Object.keys(objA); // objA의 모든 키를 배열로 반환
    const key2 = Object.keys(objB); // objB의 모든 키를 배열로 반환

    // 객체 자체가 같거나 (같은 객체를 참조하거나)
    // 속성의 수가 같고 모든 키에 대해 재귀적으로 deepEquals를 호출하여 값 비교
    return (
      objA === objB ||
      (key1.length === key2.length &&
        key1.every((key) => deepEquals(objA[key], objB[key])))
    );
  }

  // 위 조건에 모두 해당하지 않으면 두 값은 같지 않음
  return false;
}

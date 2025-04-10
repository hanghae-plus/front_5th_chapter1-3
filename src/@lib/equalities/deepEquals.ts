export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;
  if (objA === null || objB === null) return false;
  if (typeof objA === "undefined" || typeof objB === "undefined") return false;

  if (isPrimitive(objA) && isPrimitive(objB)) {
    return objA === objB;
  }
  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    //    - 객체의 키 개수가 다른 경우 처리
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      //    - 재귀적으로 각 속성에 대해 deepEquals 호출
      if (!deepEquals(objA[i], objB[i])) return false;
    }
  }
  if (
    (Array.isArray(objA) && !Array.isArray(objB)) ||
    (!Array.isArray(objA) && Array.isArray(objB))
  ) {
    return false;
  }

  if (isObject(objA) && isObject(objB)) {
    if (Object.keys(objA).length !== Object.keys(objB).length) return false;
    return Object.keys(objA).every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }

  return true;
}

const isPrimitive = (obj: unknown) => obj !== Object(obj);
const isObject = (obj: unknown) => {
  return typeof obj === "object" && obj !== null && obj.constructor === Object;
};

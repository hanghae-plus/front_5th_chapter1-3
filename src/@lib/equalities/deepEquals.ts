/** 두 값의 깊은 비교를 수행 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return false;
  }

  // 둘 다 객체인 경우
  if (typeof objA === "object" && typeof objB === "object") {
    const keyA = Object.keys(objA);
    const keyB = Object.keys(objB);

    if (keyA.length !== keyB.length) return false;

    return keyA.every((key) => {
      if (typeof objA[key] === "object" && typeof objB[key] === "object") {
        return deepEquals(objA[key], objB[key]);
      }
      return objA[key] === objB[key];
    });
  }

  return objA === objB;
}

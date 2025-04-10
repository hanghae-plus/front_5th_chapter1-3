export function deepEquals(objA: unknown, objB: unknown): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  if (objA === null || objB === null) {
    return false;
  }

  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);
  if (isArrayA !== isArrayB) {
    return false;
  }
  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;
    return objA.every((item: unknown, index: number) =>
      deepEquals(item, objB[index]),
    );
  }

  //    - 객체의 키 개수가 다른 경우 처리
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);
  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  return objAKeys.every(
    // eslint-disable-next-line no-prototype-builtins
    (key) => objB.hasOwnProperty(key) && deepEquals(objA[key], objB[key]),
  );
}

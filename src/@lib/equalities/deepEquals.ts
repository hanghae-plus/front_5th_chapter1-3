// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(objA: any, objB: any): boolean {
  // 1. 기본 타입이거나 null/undefined인 경우 처리
  if (Object.is(objA, objB)) {
    return true;
  }

  // null 또는 undefined 중 하나라도 다르면 false
  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return false;
  }

  // 기본 타입이 아닌데 typeof가 다르면 false
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 2. 둘 다 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  // 하나는 배열이고 하나는 객체인 경우
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;

  // 3. 둘 다 일반 객체인 경우
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEquals(objA[key], objB[key])) return false;
  }

  return true;
}

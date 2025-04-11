export function deepEquals<T = unknown>(objA: T, objB: T): boolean {
  // 참조 또는 값이 완전히 동일한 경우
  if (objA === objB) return true;

  // NaN === NaN 예외 처리
  if (
    typeof objA === "number" &&
    typeof objB === "number" &&
    isNaN(objA) &&
    isNaN(objB)
  ) {
    return true;
  }

  // 기본 타입 또는 null 처리
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // 배열인지 판별
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);
  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    const arrA = objA as unknown as unknown[];
    const arrB = objB as unknown as unknown[];
    if (arrA.length !== arrB.length) return false;
    for (let i = 0; i < arrA.length; i++) {
      if (!deepEquals(arrA[i], arrB[i])) return false;
    }
    return true;
  }

  // 일반 객체 비교
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);
  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;

    const valA = (objA as Record<string, unknown>)[key];
    const valB = (objB as Record<string, unknown>)[key];

    if (!deepEquals(valA, valB)) return false;
  }

  return true;
}

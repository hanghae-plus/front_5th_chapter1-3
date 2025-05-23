export const shallowEquals = <T>(objA: T, objB: T): boolean => {
  // 타입이 다른 지 먼처 확인
  if (typeof objA !== typeof objB) return false;

  // 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((a, idx) => a === objB[idx]);
  }

  // 객체일 경우
  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (objA[key as keyof T] !== objB[key as keyof T]) {
        return false;
      }
    }
    return true;
  }

  // 나머지 원시 타입
  return objA === objB;
};

const isObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

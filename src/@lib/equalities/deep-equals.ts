export const deepEquals = <T>(objA: T, objB: T): boolean => {
  // 타입이 다르면 무조건 false
  if (typeof objA !== typeof objB) return false;

  // 배열일 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, i) => deepEquals(item, objB[i]));
  }

  // 객체일 경우
  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }

  // 나머지 원시 타입
  return objA === objB;
};

const isObject = (
  value: unknown,
): value is Record<string | number | symbol, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;
  // 둘 중 하나라도 null이거나 객체가 아닌 경우
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 2. 둘 다 배열인 경우 깊이 비교하기
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // 3. 둘 다 객체인 경우 깊이 비교하기
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      ),
  );
}

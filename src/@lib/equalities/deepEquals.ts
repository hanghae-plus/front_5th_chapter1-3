export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조같이 같은 경우
  if (objA === objB) return true;

  // 1. 기본 타입이거나 null인 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 둘다 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열의 갯수가 다른 경우
    if (objA.length !== objB.length) return false;
    return objA.every((value, index) => deepEquals(value, objB[index]));
  }

  // 한쪽은 배열, 한쪽은 객체 일 경우
  if (Array.isArray(objA) || Array.isArray(objB)) return false;

  // 일반 객체 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 객체의 키 개수가 다른 경우
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEquals(objA[key], objB[key]));
}

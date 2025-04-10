export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;
  // 둘 중 하나라도 null이거나 객체가 아닌 경우
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }
  // 2.1 Array인 경우 얇게 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => item === objB[index]);
  }

  // 2.2 객체인 경우 얇게 비교 (중첩된 객체는 참조 비교만)
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  // 키의 개수가 다르면 false
  if (keysA.length !== keysB.length) return false;

  // 각 키의 값을 참조 비교
  return keysA.every((key) => {
    const itemA = (objA as Record<string, unknown>)[key];
    const itemB = (objB as Record<string, unknown>)[key];

    return itemA === itemB;
  });
}

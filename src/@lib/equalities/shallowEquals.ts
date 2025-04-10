/**
 * 얕은 비교 함수
 * 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
 * 2. 둘 중 하나라도 객체가 아닌 경우 처리
 * 3. 객체의 키 개수가 다른 경우 처리
 * 4. 모든 키에 대해 얕은 비교 수행
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;

  // 3&4. 둘 다 객체인 경우
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);

    // 3. 키 개수 비교
    if (keysA.length !== keysB.length) return false;

    // 4. 모든 키에 대해 얕은 비교 수행
    for (const key of keysA) {
      if (
        (objA as Record<string, unknown>)[key] !==
        (objB as Record<string, unknown>)[key]
      ) {
        return false;
      }
    }
    return true;
  }

  // 2. 하나라도 객체가 아닌 경우 처리
  return objA === objB;
}

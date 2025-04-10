/**
 * 깊은 비교 함수
 * 1. 기본 타입이거나 null인 경우 처리
 * 2. 둘 다 객체인 경우:
 *    - 배열인지 확인
 *    - 객체의 키 개수가 다른 경우 처리
 *    - 재귀적으로 각 속성에 대해 deepEquals 호출
 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우
  if (objA === objB) return true;

  // 2. 둘 다 객체인 경우
  if (typeof objA == "object" && typeof objB == "object") {
    // 2.1 배열인 경우
    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) return false;

      for (let i = 0; i < objA.length; i++) {
        if (!deepEquals(objA[i], objB[i])) {
          return false;
        }
      }
      return true;
    } else {
      // 2.2 배열이 아닌 객체인 경우

      const keysA = Object.keys(objA as object);
      const keysB = Object.keys(objB as object);

      // 키 개수가 다른 경우 처리
      if (keysA.length !== keysB.length) return false;

      // 키 개수가 같은 경우 각 속성에 대해 재귀적으로 비교
      for (const key of keysA) {
        if (
          !deepEquals(
            (objA as Record<string, unknown>)[key],
            (objB as Record<string, unknown>)[key],
          )
        )
          return false;
      }
    }

    return true;
  }

  return false;
}

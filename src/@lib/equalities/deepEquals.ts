/**
 * 깊은 동등성 비교 함수
 * 기본 타입 + 중첩된 객체와 배열의 내용까지 비교
 *
 * @template T - 비교할 값들 타입
 * @param objA 1 비교
 * @param objB 2 비교
 * @returns 깊게 동등하면 true, 아니면 false
 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 비교 (number, string, boolean, null, undefined)
  if (Object.is(objA, objB)) return true;

  // null이나 undefined 체크
  if (objA == null || objB == null) return false;

  // 타입이 다른 경우
  if (typeof objA !== typeof objB) return false;

  // 모든 요소를 철저하게 비교..
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }

    return true;
  }

  // 객체 비교 (배열이 아닌 객체ㅋㅋ)
  if (typeof objA === "object" && typeof objB === "object") {
    const objATyped = objA as Record<string, unknown>; // 타입... 선언을 위한..(귀찮네요)
    const objBTyped = objB as Record<string, unknown>;

    const keysA = Object.keys(objATyped);
    const keysB = Object.keys(objBTyped);

    // 키 개수 비교
    if (keysA.length !== keysB.length) return false;

    // 키 철저하게 비교..
    for (const key of keysA) {
      // 키 존재 여부 확인
      if (!Object.prototype.hasOwnProperty.call(objBTyped, key)) return false;

      if (!deepEquals(objATyped[key], objBTyped[key])) return false;
    }

    return true;
  }

  return false;
}

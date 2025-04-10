/**
 * 동등성 비교 함수
 * 얕은 비교 수행
 * 중첩된 객체나 배열은 참조 비교
 *
 * @template T - 비교할 값들 타입
 * @param objA 1 비교
 * @param objB 2 비교
 * @returns 얕게 동등하면 true, 아니면 false
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 비교 (number, string, boolean, null, undefined)
  if (Object.is(objA, objB)) return true;

  // null이나 undefined 체크
  if (objA == null || objB == null) return false;

  // 타입이 다른 경우
  if (typeof objA !== typeof objB) return false;

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열 길이 비교
    if (objA.length !== objB.length) return false;

    return objA.every((v, idx) => Object.is(v, objB[idx]));
  }

  // 객체 비교
  if (typeof objA === "object" && typeof objB === "object") {
    const objATyped = objA as Record<string, unknown>;
    const objBTyped = objB as Record<string, unknown>;

    const keysA = Object.keys(objATyped);
    const keysB = Object.keys(objATyped);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(objBTyped, key) &&
        //
        Object.is(objATyped[key], objBTyped[key])
    );
  }
  return false;
}

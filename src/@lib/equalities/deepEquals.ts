// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 참조가 같은 경우 (동일 객체 또는 동일 기본 값)
  if (objA === objB) return true;

  // 2. 둘 중 하나가 null 또는 undefined
  if (objA == null || objB == null) return false;

  // 3. 타입이 다른 경우
  if (typeof objA !== typeof objB) return false;

  // 4. 기본 타입인 경우
  if (typeof objA !== "object") return false;

  // 5. 배열인지 확인
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  // 하나만 배열
  if (isArrayA !== isArrayB) return false;

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;

    // 배열의 각 요소를 깊은 비교
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) return false;
    }

    return true;
  }

  // 6. 객체의 키 개수가 다른 경우
  const a = objA as Record<string, unknown>;
  const b = objB as Record<string, unknown>;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    // 다른 객체에 해당 키가 없는 경우
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;

    // 값을 재귀적으로 비교
    if (
      !deepEquals(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
      )
    )
      return false;
  }
  return true;
}

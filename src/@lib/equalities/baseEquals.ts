export function baseEquals<T>(
  objA: T,
  objB: T,
  compareFn: (a: unknown, b: unknown) => boolean
): boolean {
  // 같은 객체를 참조하는 경우 true 반환
  if (objA === objB) {
    return true;
  }

  // null 과 undefined 를 구분하기 위한 처리
  // 둘 중 하나가 null 인 경우 둘 다 null 이어야만 true 반환
  if (objA === null || objB === null) {
    return objA === objB;
  }

  // 타입이 다른 경우 false 반환
  if (typeof objA !== typeof objB) {
    return false;
  }

  // 객체나 배열이 아닌 기본 타입인 경우 직접 비교하여 반환
  if (typeof objA !== "object") {
    return Object.is(objA, objB);
  }

  // 배열 비교 - compareFn 에 따라 얕은 비교 또는 깊은 비교 수행
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열의 길이가 다른 경우 false 반환
    if (objA.length !== objB.length) {
      return false;
    }

    // 각 인덱스의 요소를 compareFn 을 사용하여 비교
    // compareFn 이 === 이면 얕은 비교, 재귀적 호출이면 깊은 비교 수행
    return objA.every((v, i) => compareFn(v, objB[i]));
  }

  // 객체 비교 - compareFn 에 따라 얕은 비교 또는 깊은 비교 수행
  const keysA = Object.keys(objA as Record<string, unknown>);
  const keysB = Object.keys(objB as Record<string, unknown>);

  // 객체의 키 개수가 다른 경우 false 반환
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 모든 키-값 쌍을 compareFn 을 사용하여 비교
  // compareFn이 === 이면 얕은 비교, 재귀적 호출이면 깊은 비교 수행
  return keysA.every((key) =>
    compareFn(
      (objA as Record<string, unknown>)[key],
      (objB as Record<string, unknown>)[key]
    )
  );
}

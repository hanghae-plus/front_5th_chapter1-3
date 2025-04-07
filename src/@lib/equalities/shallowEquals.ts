// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals(a: unknown, b: unknown): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  // 3. 객체의 키 개수가 다른 경우 처리
  // 4. 모든 키에 대해 얕은 비교 수행

  if (a === b) {
    // 참조가 같은 경우
    return true;
  }

  if (typeof a !== "object" || typeof b !== "object") {
    //  둘 중 하나라도 객체가 아닌 경우 처리
    return false;
  }

  // a,b가 이제는 객체라고 단언하여 타입 지정
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  // 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // 중첩된 구조를 깊게 비교하지 않아야 한다 -> objA[key] !== objB[key] 를 통해 중첩된 객체의 참조가 다르면 false 반환
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key] !== objB[key]
    ) {
      return false;
    }
  }

  return true;
}

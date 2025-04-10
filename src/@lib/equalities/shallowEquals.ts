// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (objA == null || objB == null) return false;
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }
  // 3. 둘 다 배열인 경우 얕은 처리
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) return false;
    }
    return true;
  }

  // 객체를 인덱싱 가능한 타입으로 캐스팅
  const a = objA as Record<string, unknown>;
  const b = objB as Record<string, unknown>;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // 4. 객체의 키 개수가 다른 경우 처리
  if (keysA.length !== keysB.length) return false;

  // 5. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || a[key] !== b[key])
      return false;
  }

  return true;
}

export function shallowEquals<T>(objA: T, objB: T): boolean {
  //원시 데이터 타입 비교
  if (Object.is(objA, objB)) {
    return true;
  }

  // 타입이 다를 경우
  if (typeof objA !== typeof objB) return false;

  // 객체가 아닌 경우
  if (typeof objA !== "object" || objA === null || objB === null) {
    return false;
  }

  // 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    //배열 길이 확인
    if (objA.length !== objB.length) {
      return false;
    }
    for (let i = 0; i < objA.length; i++) {
      if (!Object.is(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  //객체인 경우
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    const a = objA as Record<string, unknown>;
    const b = objB as Record<string, unknown>;
    if (!(key in b)) return false;
    if (!Object.is(a[key], b[key])) return false;
  }
  return true;
}

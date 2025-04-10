export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  // 3. 객체의 키 개수가 다른 경우 처리
  // 4. 모든 키에 대해 얕은 비교 수행
  if (
    objA === undefined ||
    objB === undefined ||
    objA === null ||
    objB === null
  )
    return objA === objB;

  if (typeof objA === "object" && typeof objB === "object") {
    // 이 부분을 적절히 수정하세요.
    if (Array.isArray(objA) && Array.isArray(objB)) {
      for (let i = 0; i < objA.length; i++) {
        if (objA[i] !== objB[i]) return false;
      }
      return true;
    }
    const keyA = Object.keys(objA) as (keyof typeof objA)[];
    const keyB = Object.keys(objB) as (keyof typeof objB)[];

    if (keyA.length !== keyB.length) return false;

    for (const key of keyA) {
      if (objA[key] !== objB[key]) return false;
    }
    return true;
  }

  return objA === objB;
}

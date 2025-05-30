export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;
  // 추가: null인 경우
  if (objA === null || objB === null) return false;
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  // 3. 객체의 키 개수가 다른 경우 처리
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;
  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key in objA) {
    if (objA[key] !== objB[key]) return false;
  }
  return true;
}

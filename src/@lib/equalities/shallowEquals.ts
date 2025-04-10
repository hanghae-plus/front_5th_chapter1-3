export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (objA === null || objB === null) return false;
  if (
    (typeof objA === "object" && typeof objB !== "object") ||
    (typeof objA !== "object" && typeof objB === "object")
  ) {
    return false;
  }
  // 3. 객체의 키 개수가 다른 경우 처리
  if (typeof objA === "undefined" || typeof objB === "undefined") return false;
  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }
  // 4. 모든 키에 대해 얕은 비교 수행
  if (typeof objA === "object" && typeof objB === "object") {
    return Object.entries(objA).every(([key, value]) => {
      return objB[key as keyof typeof objB] === value;
    });
  }

  return objA === objB;
}

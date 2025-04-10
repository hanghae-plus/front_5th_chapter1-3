// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  // 3. 객체의 키 개수가 다른 경우 처리
  // 4. 모든 키에 대해 얕은 비교 수행

  if (objA === objB) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }
  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }
  for (const key of Object.keys(objA)) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key as keyof T] !== objB[key as keyof T]
    ) {
      return false;
    }
  }

  return true;
}

// 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
// 2. 둘 중 하나라도 객체가 아닌 경우 처리
// 3. 객체의 키 개수가 다른 경우 처리
// 4. 모든 키에 대해 얕은 비교 수행

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 참조가 같은 경우
  if (objA === objB) return true;

  // 타입스크립트 예외 처리
  if (objA === null || objB === null) return false;
  if (objA === undefined || objB === undefined) return false;

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false; // every 실행 전 먼저 길이로 판별
    return objA.every((item, index) => item === objB[index]);
  }

  // 객체 비교
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    // 객체의 키 개수가 다른 경우 처리
    if (keysA.length !== keysB.length) return false;
    // 모든 키에 대해 얕은 비교 수행
    return keysA.every((key) => objA[key as keyof T] === objB[key as keyof T]);
  }

  return false;
}

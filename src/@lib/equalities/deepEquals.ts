// 1. 기본 타입이거나 null인 경우 처리
// 2. 둘 다 객체인 경우:
//    - 배열인지 확인
//    - 객체의 키 개수가 다른 경우 처리
//    - 재귀적으로 각 속성에 대해 deepEquals 호출

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 같은 참조인지 먼저 확인하여 불필요한 재귀 호출을 방지
  if (objA === objB) return true;

  // 예외 처리
  if (objA === null || objB === null) return false;
  if (objA === undefined || objB === undefined) return false;

  // 배열 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // 객체 비교
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T])
    );
  }

  // 기본 타입 비교
  return objA === objB;
}

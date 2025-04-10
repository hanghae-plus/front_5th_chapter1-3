// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) return true;
  if (objA === null || objB === null) return false;

  // 2. 둘 다 객체인 경우:
  if (typeof objA === "object" || typeof objB === "object") {
    const isArrayA = Array.isArray(objA);
    const isArrayB = Array.isArray(objB);
    if (isArrayA && isArrayB) {
      // 배열인지 확인
      if (objA.length !== objB.length) return false; //두 배열의 길이가 같은지 확인
      return objA.every((item, index) => deepEquals(item, objB[index])); // 재귀적으로 각 속성에 대해 deepEquals 호출
    }

    if (
      Object.keys(objA as object).length !== Object.keys(objB as object).length
    )
      return false; // 객체의 키 개수가 다른 경우 처리

    return Object.keys(objA as object).every(
      (key) => deepEquals(objA[key as keyof T], objB[key as keyof T]), // TODO: 'objA' is possibly 'undefined'.
    );
  }

  return objA === objB;
}

/**
 * 1. 기본 타입이거나 null인 경우 처리
 * 2. 둘 다 객체인 경우:
 *  - 배열인지 확인
 *  - 객체의 키 개수가 다른 경우 처리
 * - 재귀적으로 각 속성에 대해 deepEquals 호출
 * 이 부분을 적절히 수정하세요.
 * @param objA
 * @param objB
 * @returns
 */
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true;
  }
  // 2. 둘다 객체인 경우
  // - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    // - 재귀적으로 각 속성에 대해 deepEquals 호출
    return objA.every((value: T, key: number) => deepEquals(value, objB[key]));
  }

  // - 둘 중 하나라도 객체가 아닌 경우 처리 함수
  const isObject = (obj: unknown): obj is Record<string, unknown> => {
    return obj !== null && typeof obj === "object";
  };

  // - 객체의 키 개수가 다른 경우 처리
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);
    if (entriesA.length !== entriesB.length) {
      return false;
    }
    // - 재귀적으로 각 속성에 대해 deepEquals 호출
    return entriesA.every(([key, value]: [string, unknown]) => {
      return (
        Object.prototype.hasOwnProperty.call(objB, key) &&
        deepEquals(value, objB[key])
      );
    });
  }

  return objA === objB;
}

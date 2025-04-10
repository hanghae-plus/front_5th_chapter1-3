/**
 * shallowEquals
 * 두 객체가 얕은 비교를 통해 같은지 확인합니다.
 * 얇은 비교란 개체의 속성 값이 같은지 확인하는 것입니다.
 * 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
 * 2. 둘 중 하나라도 객체가 아닌 경우 처리
 * 3. 객체의 키 개수가 다른 경우 처리
 * 4. 모든 키에 대해 얕은 비교 수행
 *  이 부분을 적절히 수정하세요.
 * @param objA
 * @param objB
 * @returns
 */

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
  // 2. 둘중 하나라도 객체가 아닌 경우 처리 함수
  const isObject = (obj: unknown): obj is Record<string, unknown> => {
    return obj !== null && typeof obj === "object";
  };

  // 2. 두개 모두 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value: T, key: number) => objB[key] === value);
  }

  // 3. 둘 중 하나라도 객체가 아닌 경우 처리
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);
    return (
      entriesA.length === entriesB.length &&
      entriesA.every(([key, value]) => {
        return objB[key] === value;
      })
    );
  }
  return false;
}

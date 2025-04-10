/**
 * shallowEquals 함수는 두 값의 얕은 (===) 비교를 수행합니다.
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 배열 얕은 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    //
    if (objA.length !== objB.length) return false;

    // 배열의 각 요소 얕은 비교
    return objA.every((value, index) => value === objB[index]);
  }

  // 객체 얕은 비교
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    // 키 개수가 다르면 두 객체가 같을 수 없음
    if (entriesA.length !== entriesB.length) return false;

    return entriesA.every(([key, value]) => {
      // 다른 객체지만 동일한 값을 가지는 경우
      // { a: 1, b: 2 } === { a: 1, b: 2 }
      return objB[key] === value;
    });
  }

  // 참조 비교
  return objA === objB;
}

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

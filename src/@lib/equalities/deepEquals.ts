export function deepEquals<T>(objA: T, objB: T): boolean {
  // 배열 깊은 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    // 배열의 각 요소 깊은 비교
    return objA.every((value, index) => {
      return deepEquals(value, objB[index]);
    });
  }

  // 객체 깊은 비교
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    // 객체의 속성 개수가 다르면 두 객체가 같을 수 없음
    if (entriesA.length !== entriesB.length) return false;

    // 객체 A의 모든 속성이 객체 B에도 존재하고 값이 같은지 확인
    return entriesA.every(([key, value]) => {
      // 각 키 별로 값이 일치하는지 재귀적으로 깊은 비교
      return deepEquals(value, objB[key]);
    });
  }

  // 기본 타입 비교, 참조가 같으면 true 반환
  return objA === objB;
}

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

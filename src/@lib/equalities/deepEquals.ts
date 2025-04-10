export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조 동일성을 검사합니다.
  // 두 값이 메모리 상에서 동일한 주소를 가리키고 있는지를 비교합니다.

  // 1. 원시 타입(string, number, boolean 등): 값 자체를 비교
  if (objA === objB) {
    return true;
  }
  // 2. 참조 타입(객체, 배열 함수 등) 참조만 비교
  // 참조가 동일하지 않은데 객체가 아니면 (원시타입이면)
  // 값이 null이면 false를 반환
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }
  // 3. 객체는 객체의 최상위 속성들만 얕은 비교로 비교
  // 참조가 동일하지 않은 객체면 키와 값을 비교합니다.
  // 두 객체의 키를 가져옵니다.
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  // 키의 길이가 다르면 false를 반환합니다.
  if (keysA.length !== keysB.length) {
    return false;
  }
  // 키의 길이가 같고, 두 객체가 객체인지 확인하면
  if (isObject(objA) && isObject(objB)) {
    // A의 키를 순회하면서 B에 있는지 확인합니다.
    for (const key of keysA) {
      if (!Object.hasOwnProperty.call(objB, key) || !Object.hasOwn(objB, key)) {
        // B에 키가 없으면 false
        return false;
      }
      if (objA[key] !== objB[key]) {
        // 하나의 키에 대해서 A와 B의 값이 다르면 재귀적으로 equals를 확인합니다.
        return deepEquals(objA[key], objB[key]);
      }
    }
  }
  // 4. 배열을 정확히 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    objA.sort();
    objB.sort();
    objA.forEach((v, index) => {
      deepEquals(v, objB[index]);
    });
  }
  return true;
}

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object" && Object.keys(obj).length > 0;
};

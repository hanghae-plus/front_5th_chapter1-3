// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리 (객체가 아니거나 null 인경우)
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행

  for (const key of keysA) {
    //keysA는 Object.keys(objA)로 얻은 문자열 배열
    // hasOwnProperty(key)해당 키(속성)가 객체에 직접 존재하는지를 확인
    if (
      !objB.hasOwnProperty(key) ||
      (objA as any)[key] !== (objB as any)[key]
    ) {
      return false;
    }
  }

  return true;
}

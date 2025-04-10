// shallowEquals 함수는 두 값의 얕은 비교를 수행합니다.
export function shallowEquals<T extends Record<string, any>>( // 제네릭 타입 제한 추가 - 객체가 항상 문자열 키와 값을 가지도록 보장 - objA[key], objB[key] "index signiture" 에러 해결
  objA: T,
  objB: T,
): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) return true;

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  )
    return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  if (objA === null || objB === null) return false; // "No overload matches this call" 에러 해결

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) return false;
  }

  return true;
}

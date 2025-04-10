/**
 * 1. 기본 타입이거나 null인 경우 처리
 * 2. 둘 다 객체인 경우:
 *    - 배열인지 확인
 *    - 객체의 키 개수가 다른 경우 처리
 *    - 재귀적으로 각 속성에 대해 deepEquals 호출
 * 3. 두 값이 같으면 true, 다르면 false 반환
 * @param objA 비교할 객체
 * @param objB 비교할 객체
 * @returns 두 객체가 같은지 여부
 */

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (JSON.stringify(objA) === JSON.stringify(objB)) return true;
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((v, i) => deepEquals(v, objB[i]));
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    deepEquals(objA[key as keyof T], objB[key as keyof T]),
  );
}

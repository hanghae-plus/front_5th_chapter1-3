/**
 * 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
 * 2. 둘 중 하나라도 객체가 아닌 경우 처리
 * 3. 객체의 키 개수가 다른 경우 처리
 * 4. 모든 키에 대해 얕은 비교 수행
 * @param objA 비교할 객체
 * @param objB 비교할 객체
 * @returns 두 객체가 같은지 여부
 */

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => objA[key as keyof T] === objB[key as keyof T]);
}

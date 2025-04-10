// path: ~/Develop/front_5th_chapter1-3/src/@lib/equalities/shallowEquals.ts

// shallowEquals : 얕은 비교
// 1. 원시값은 값 자체를 비교(===, Object.is)
// 2. 객체나 배열은 참조 주소만 비교, 내부의 값은 비교하지 않음
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인(===, Object.is)
  // 원시값인 경우 값 자체를 비교
  if (Object.is(objA, objB)) {
    return true;
  }

  // null, undefined인 경우 처리
  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return false;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 객체의 키 개수가 다르면 false
  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key in objA) {
    // 키가 objB에 없거나, 값이 다른 경우 false
    if (!keysB.includes(key) || !Object.is(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}

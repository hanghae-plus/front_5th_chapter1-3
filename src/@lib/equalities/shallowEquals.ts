/*
  두 값의 얕은 비교를 수행
  1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  2. 둘 중 하나라도 객체가 아닌 경우 처리
  3. 객체의 키 개수가 다른 경우 처리
  4. 모든 키에 대해 얕은 비교 수행
 */

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // case 1
  if (objA === objB) {
    return true;
  }

  // case 2
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  // case 3
  const objAKeys = Object.keys(objA as object);
  const objBKeys = Object.keys(objB as object);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  // case 4
  for (const key of objAKeys) {
    if (key in objB && objA[key as keyof T] === objB[key as keyof T]) {
      continue;
    }
    return false;
  }
  return true;
}

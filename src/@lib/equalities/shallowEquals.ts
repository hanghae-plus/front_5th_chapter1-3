export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 둘 중 하나라도 객체가 아닌 경우
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  // 객체의 키 개수가 다른 경우
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (!(key in objB)) return false;
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}

// === : 원시값은 값 비교, 참조값은 주소 비교
// 얕은 비교란 → 1단계 key-value 만 비교, 그 안에 객체가 있어도 === 로만 비교
// 얕은 비교 : 숫자, 문자열 등 원시 자료형은 값을 비교하고 배열, 객체 등 참조 자료형은 값, 속성을 비교하지 않고 참조되는 위치를 비교한다.

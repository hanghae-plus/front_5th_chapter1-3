// Object.is와 동일한 동작을 하는 함수
function is<T>(x: T, y: T): boolean {
  return (
    (x === y && (x !== 0 || 1 / (x as number) === 1 / (y as number))) ||
    (x !== x && y !== y)
  );
}

// shallowEquals 함수는 두 객체의 얕은 비교를 수행합니다.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}

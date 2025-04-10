export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  // 기본 타입, null, undefined인 경우 비교
  if (
    typeof objA !== "object" ||
    objA === null ||
    objA === undefined ||
    typeof objB !== "object" ||
    objB === null ||
    objB === undefined
  ) {
    return objA === objB;
  }

  // 여기 도달하면 두 값이 객체임이 보장됨
  // 배열인 경우 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    // 배열 안의 배열 비교
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 객체 속성 비교
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(objA[key], objB[key]),
  );
}

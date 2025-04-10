export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 같은 참조인 경우 true;
  if (Object.is(objA, objB)) {
    return true;
  }

  // 둘 중 하나가 null 또는 undefined인 경우 false
  if (
    objA === null ||
    objB === null ||
    objA === undefined ||
    objB === undefined
  ) {
    return false;
  }

  // 둘 다 객체인 경우
  if (typeof objA === "object" && typeof objB === "object") {
    const keyA = Object.keys(objA);
    const keyB = Object.keys(objB);

    if (keyA.length !== keyB.length) return false;

    return keyA.every((key) => objA[key] === objB[key]);
  }

  return objA === objB;
}

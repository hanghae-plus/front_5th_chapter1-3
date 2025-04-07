export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 완전 동일한 값인지 비교
  if (objA === objB) {
    return true;
  }

  // 2. null인지 체크
  if (objA === null || objB === null) {
    return false;
  }

  // 3. 타입 체크(원시값은 객체 비교 의미가 없음)
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 4. 배열인지 체크
  if (Array.isArray(objA) !== Array.isArray(objB)) {
    return false;
  }

  // 5. 객체 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  return keysA.every((key) => Object.is(objA[key], objB[key]));
}

function isObject(target: unknown) {
  return typeof target === "object";
}

export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  // 배열비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    // 각 요소를 얕게 비교
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        return false;
      }
    }
    return true;
  }

  // 객체 비교 (배열이 아닌 객체)
  if (
    typeof objA === "object" &&
    typeof objB === "object" &&
    objA !== null &&
    objB !== null
  ) {
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (
        (objA as Record<string, unknown>)[key] !==
        (objB as Record<string, unknown>)[key]
      ) {
        return false;
      }
    }

    return true;
  }

  return false;
}

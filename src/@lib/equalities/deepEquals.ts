export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 비교 (참조 동일)
  if (objA === objB) {
    return true;
  }

  // null 또는 undefined 체크
  if (objA == null || objB == null) {
    return false;
  }

  // 타입 체크
  const typeOfA = typeof objA;
  const typeOfB = typeof objB;

  if (typeOfA !== typeOfB) {
    return false;
  }

  // 배열 깊은 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    // 각 요소를 깊게 비교
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }

    return true;
  }

  // 객체 깊은 비교
  if (typeOfA === "object") {
    const keysA = Object.keys(objA as object);
    const keysB = Object.keys(objB as object);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // 각 속성을 깊게 비교
    for (const key of keysA) {
      if (
        !keysB.includes(key) ||
        !deepEquals(
          (objA as Record<string, unknown>)[key],
          (objB as Record<string, unknown>)[key],
        )
      ) {
        return false;
      }
    }

    return true;
  }

  // 기본 타입 비교 (이미 위에서 === 검사했으므로 여기까지 왔다면 false)
  return false;
}

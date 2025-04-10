export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 값들을 정확히 비교해야 한다.
  if (objA === null) {
    return objA === objB;
  }

  // 배열을 얕게 비교해야 한다
  if (Array.isArray(objA) && Array.isArray(objB)) {
    for (let i = 0; i < objA.length; i++) {
      if (objA[i] !== objB[i]) {
        return false;
      }
    }
    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    const objALength = Object.keys(objA).length;
    const objBLength = Object.keys(objB).length;
    if (objALength !== objBLength) return false;

    for (const [key, value] of Object.entries(objA)) {
      if (objB[key] !== value) {
        return false;
      }
    }
    return true;
  }

  return objA === objB;
}

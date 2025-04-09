// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입
  if (objA === objB) return true;
  //null인 경우이거나 타입 다르면 비교 의미 없음음
  if (objA === null || objB === null || typeof objA !== typeof objB) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  if (typeof objA === "object" && typeof objB === "object") {
    //    - 객체의 키 개수가 다른 경우 처리
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      //objB 객체가 해당 key를 직접 가지고 있는지 확인한다.
      if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
      // objA와 objB의 해당 키 값을 재귀적으로 깊은 비교하라.
      if (!deepEquals((objA as any)[key], (objB as any)[key])) return false;
    }

    //  - 배열인지 확인 (deepEquals는 내용을 하나하나 비교해야 true로 판단 가능)
    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) return false;

      //정확히 비교
      for (let i = 0; i < objA.length; i++) {
        // - 재귀적으로 각 속성에 대해 deepEquals 호출
        if (!deepEquals(objA[i], objB[i])) return false;
      }
    }
    return true;
  }

  return false;
}

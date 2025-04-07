// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals(a: unknown, b: unknown): boolean {
  // 하나라도 null 이면 정확한 값으로 체크 null, undefined 경우
  if (a === null || b === null) {
    return a === b;
  }
  
  // 타입이 다른 경우 false
  if (typeof a !== typeof b) return false;

  if (
      typeof a !== "object" &&
      typeof b !== "object"
  ) {
    return a === b;
  }

  // 배열과 객체가 섞인 경우 → false
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEquals(a[i], b[i])) return false;
    }
    return true;
  }

  if (
      typeof a === "object" &&
      typeof b === "object"
  ) {
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!(key in b)) return false;

      if (!deepEquals(a[key], b[key])) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

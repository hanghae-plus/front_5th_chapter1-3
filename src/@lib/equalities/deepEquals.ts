/*
  두 값의 깊은 비교를 수행
  1. 기본 타입이거나 null인 경우 처리
  2. 둘 다 객체인 경우:
    2-1. 배열인지 확인
    2-2. 객체의 키 개수가 다른 경우 처리
    - 재귀적으로 각 속성에 대해 deepEquals 호출
*/
export function deepEquals<T>(objA: T, objB: T): boolean {
  // case 1
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return objA === objB;
  }

  // case 2-1
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
      continue;
    }
    return true;
  }

  // case 2-2
  const objAKeys = Object.keys(objA);
  const objBKeys = Object.keys(objB);

  if (objAKeys.length !== objBKeys.length) {
    return false;
  }

  for (const key of objAKeys) {
    if (key in objB && deepEquals(objA[key as keyof T], objB[key as keyof T])) {
      continue;
    }
    return false;
  }

  return true;
}

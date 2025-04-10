function isSameNull(objA: unknown, objB: unknown) {
  return objA === objB;
}

function isSameUndefiend(objA: unknown, objB: unknown) {
  return objA === objB;
}

// 0409 배운점.
// Array.every()는 배열의 모든 요소가 주어진 판별 함수를 통과하는지 테스트합니다.
// 이점을 이용해 배열 내 요소가 같은지 체크할수있음.
function isSameArray<T>(arrA: T[], arrB: T[]) {
  const arrayA = JSON.parse(JSON.stringify(arrA)) as T[];
  const arrayB = JSON.parse(JSON.stringify(arrB)) as T[];
  if (arrayA.length !== arrayB.length) return false;
  return arrayA.every((item, index) => deepEquals(item, arrayB[index]));
}

// 객체 역시 0409에 배운 Array.every()를 이용해 비교할수 있다.
// 어떻게 객체를 배열로 만들지 에 대한 고민.
function isSameObject<T extends Record<string, unknown>>(objA: T, objB: T) {
  const objectA = Object.keys(JSON.parse(JSON.stringify(objA))) as (keyof T)[];
  const objectB = Object.keys(JSON.parse(JSON.stringify(objB))) as (keyof T)[];
  if (objectA.length !== objectB.length) return false;
  return objectA.every((key) => deepEquals(objA[key], objB[key]));
}

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;
  if (objA === undefined || objB === undefined) {
    return isSameUndefiend(objA, objB);
  }
  if (objA === null || objB === null) return isSameNull(objA, objB);
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return isSameArray(objA as unknown[], objB as unknown[]);
  }

  if (typeof objA === "object" && typeof objB === "object") {
    return isSameObject(
      objA as Record<string, unknown>,
      objB as Record<string, unknown>,
    );
  }
  return objA === objB;
}

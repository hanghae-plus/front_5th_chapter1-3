// 1. 타입 정의
type DeepPrimitive = string | number | boolean | null;
type DeepObject = { [key: string]: DeepComparable };
export type DeepComparable = DeepPrimitive | DeepComparable[] | DeepObject;

// 2. 헬퍼 함수: 객체인지 여부 확인
const isObject = (value: unknown): value is DeepObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// 3. 배열 비교 함수
const compareArrays = (
  arrA: DeepComparable[],
  arrB: DeepComparable[],
): boolean => {
  if (arrA.length !== arrB.length) return false;
  return arrA.every((value, index) => deepEquals(value, arrB[index]));
};

// 4. 객체 비교 함수
const compareObjects = (objA: DeepObject, objB: DeepObject): boolean => {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => {
    return (
      Object.prototype.hasOwnProperty.call(objB, key) &&
      deepEquals(objA[key], objB[key])
    );
  });
};

// 5. deepEquals 메인 함수
export function deepEquals(a: unknown, b: unknown): boolean {
  // 기본 타입 또는 같은 값인 경우 (기본 타입의 경우 값 비교로 충분)
  if (a === b) return true;

  // null 체크
  if (a === null || b === null) return false;

  // 배열인 경우
  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArrays(a as DeepComparable[], b as DeepComparable[]);
  }

  // 객체인 경우
  if (isObject(a) && isObject(b)) {
    return compareObjects(a, b);
  }

  // 그 외에는 다르면 false
  return false;
}

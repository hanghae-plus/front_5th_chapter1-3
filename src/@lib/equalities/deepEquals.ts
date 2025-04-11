// shallowEquals를 그대로 가져온 뒤, 이퀄 부분만 변경할 것

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열에 대한 깊은 비교
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value, key) => deepEquals(value, objB[key]));
  }
  if (isObject(objA) && isObject(objB)) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) => deepEquals(objA[key], objB[key]));
  }
  return false;
}

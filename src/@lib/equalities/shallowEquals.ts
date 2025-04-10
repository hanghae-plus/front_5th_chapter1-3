// Record 타입: 키-값 쌍을 가진 객체 타입을 정의할 때 사용
export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    // 같은 객체 참조 확인
    return true;
  }

  // 객체 여부 비교
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 속성 수 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 속성 값 비교
  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(objB, key) &&
      objA[key] === objB[key],
  );
}

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 원시 타입의 비교, 같을 땐 true
  if (objA === objB) return true;

  // 원시 타입의 비교, null의 type은 object이므로 써줘야 함
  // 어차피 입력 둘 다 null일 때는 위에서 처리됨
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  if (keysA.length !== keysB.length) return false; // 길이가 다르면 일일이 비교 안하고 그냥 바로 리턴

  for (const key of keysA) {
    if ((objA as any)[key] !== (objB as any)[key]) return false;
  }

  return true;
}

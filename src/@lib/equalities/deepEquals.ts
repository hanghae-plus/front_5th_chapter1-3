export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

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

  if (keysA.length !== keysB.length) return false; // 빠른 탈출 1

  for (const key of keysA) {
    if (!keysB.includes(key)) return false; // 빠른 탈출 2
    if (!deepEquals((objA as any)[key], (objB as any)[key])) return false; // 깊이를 알 수 없기 때문에 재귀
  }

  return true;
}

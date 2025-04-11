import { isObject } from "../../utils";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (Object.is(objA, objB)) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (!isObject(objA) || !isObject(objB)) {
    return false;
  }

  // if else로 타입가드를 할 것인가 단언으로 할 것인가
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);

  // 3. 객체의 키 개수가 다른 경우 처리
  if (keysA.length !== keysB.length) return false;

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (
      (objA as Record<string, unknown>)[key] !==
      (objB as Record<string, unknown>)[key]
    )
      return false;
  }

  return true;
}

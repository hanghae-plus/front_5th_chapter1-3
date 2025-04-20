import { isObj } from "../../utils/equal";

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 원시타입 비교 (둘 다 원시타입이면 여기서 걸러짐)
  if (Object.is(objA, objB)) return true;

  // 둘 다 원시타입일때 비교는 위에서 했으므로, 하나만 원시타입이면 false
  if (!isObj(objA) || !isObj(objB)) return false;

  // 둘다 객체인 상태. key 개수 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // key 개수는 같으므로, 모든 key값에 대한 value 비교
  return keysA.every((key) => deepEquals(objA[key], objB[key]));
}

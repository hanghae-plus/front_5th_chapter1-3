export function deepEquals<T>(objA: T, objB: T): boolean {
  // 참조가 같으면 true
  if (objA === objB) return true;

  // null 또는 undefined 체크
  if (objA == null || objB == null) return false;

  // 타입이 다르면 false
  if (typeof objA !== typeof objB) return false;

  // 객체가 아닌 경우 값 비교
  if (typeof objA !== "object") return objA === objB;

  // 특수한 객체 타입 처리
  // Date 객체 비교 (timestamp 값을 비교하는 이유는 같은 데이트 객체라도 각각의 데이트 객체가 실행되는 시간이 다르기 때문에 값이 달라질 수 있습니다.
  // 또한 깊은 비교는 실제 값이 같은지를 체크하는 것이
  // 목표이기 떄문에, 빠른 성능과 참조만 비교하는 얕은 비교에서는 Date 값을 처리하지 않습니다.
  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime();
  }

  // RegExp 객체 비교
  // 마찬가지 입니다.
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.toString() === objB.toString();
  }

  // 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  // Record<string, unknown> 타입으로 객체에 접근
  const objARecord = objA as Record<string, unknown>;
  const objBRecord = objB as Record<string, unknown>;

  // 객체의 키 개수가 다르면 false
  const keys1 = Object.keys(objARecord);
  const keys2 = Object.keys(objBRecord);
  if (keys1.length !== keys2.length) return false;

  // 모든 프로퍼티를 전부 비교할 때까지 재귀적으로 비교합니다.
  return keys1.every((key) => deepEquals(objARecord[key], objBRecord[key]));
}

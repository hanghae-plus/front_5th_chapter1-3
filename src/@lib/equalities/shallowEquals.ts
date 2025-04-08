export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 참조가 같으면(같은 메모리 주소를 가르키면
  if (objA === objB) return true;

  // null 또는 undefined 체크
  if (objA == null || objB == null) return false;

  // 타입이 다르면 false
  if (typeof objA !== typeof objB) return false;

  // 객체가 아닌 경우 값 비교 (원시타입일 경우 처리)
  if (typeof objA !== "object") return objA === objB;

  // 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    return objA.every((item, index) => item === objB[index]);
  }

  // Record<string, unknown> 타입으로 객체에 접근
  const objARecord = objA as Record<string, unknown>;
  const objBRecord = objB as Record<string, unknown>;

  // 객체의 키 개수가 다르면 false
  const keys1 = Object.keys(objARecord);
  const keys2 = Object.keys(objBRecord);
  if (keys1.length !== keys2.length) return false;

  // 최상위 레벨의 값만 비교
  return keys1.every((key) => objARecord[key] === objBRecord[key]);
}

// 0410 문제점
// 얕은비교가 똑바로 안이루어짐...
// 얕은 비교에 대해 전혀 잘못 알고있었음.
// 얕은 비교는 참조값만 비교하지, 내부 값을 비교하진않음.
// 기존에 알던 개념은 얕은 복사만 하고 내부값까지 비교하는줄 알았음(얕은 비교니까..얕은복사비교인가? 했던 생각)
// 얕은 비교는 단순히 참조값만 비교하는것.
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 같으면 true
  if (objA === objB) return true;

  // null, undefined 체크
  if (objA === null || objB === null) return false;
  if (objA === undefined || objB === undefined) return false;

  // 객체인지 아닌지 체크
  if (typeof objA !== "object" || typeof objB !== "object") return false;
  // 배열일때
  if (Array.isArray(objA) !== Array.isArray(objB)) return false;

  const keysA = Object.keys(objA) as (keyof T)[];
  const keysB = Object.keys(objB) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => Object.is(objA[key], objB[key]));
}

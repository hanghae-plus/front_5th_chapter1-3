import objectIs from "./objectIs";
import { shallowEquals } from "./shallowEquals";

export function deepEquals<T>(a: T, b: T): boolean {
  // shallowEquals로 기본 비교를 수행.
  // 같은 값 or 같은 참조 -> true
  if (shallowEquals(a, b)) return true;

  // 둘 중 하나라도 객체가 아니거나 null이면 깊은 비교가 불가능.
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  const keysofA = Object.keys(a) as (keyof T)[];
  const keysofB = Object.keys(b) as (keyof T)[];

  // 키의 개수가 다르면 구조 자체가 다르므로 false
  if (keysofA.length !== keysofB.length) return false;

  for (const key of keysofA) {
    // 같은 키 존재하지 않는 경우 false
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }
    // key에 대한 값 추출
    const valueofA = a[key];
    const valueofB = b[key];
    if (
      // 객체이고 null이 아니면 재귀 수행
      typeof valueofA === "object" &&
      valueofA !== null &&
      typeof valueofB === "object" &&
      valueofB !== null
    ) {
      if (!deepEquals(valueofA, valueofB)) {
        return false;
      }
    } else {
      // 객체가 아닌 경우엔 objectIs를 사용하여 기본 타잆 값 비교
      // null 비교도 여기서
      if (!objectIs(valueofA, valueofB)) {
        return false;
      }
    }
  }

  return true;
}

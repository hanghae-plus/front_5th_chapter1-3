import objectIs from "./objectIs";

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 값이 같으면 같음.
  // 참조가 같아도 같음.
  if (objectIs(objA, objB)) {
    return true;
  }

  // 둘 중 하나라도 null이거나 객체가 아니면 같지 않음.
  if (
    objA === null ||
    typeof objA !== "object" ||
    objB === null ||
    typeof objB !== "object"
  ) {
    return false;
  }

  const keyofA = Object.keys(objA) as (keyof T)[];
  const keyofB = Object.keys(objB) as (keyof T)[];

  // 길이가 다르면 같지 않음.
  if (keyofA.length !== keyofB.length) {
    return false;
  }

  // 배열과 객체 key 돌면서 비교
  for (const key of keyofA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      !objectIs(objA[key], objB[key])
    ) {
      return false;
    }
  }

  return true;
}

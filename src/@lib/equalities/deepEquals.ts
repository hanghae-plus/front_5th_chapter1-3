import { shallowEquals } from './shallowEquals';

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 기본 타입 비교는 shallowEquals 사용 [ 기본 타입은 얕은 비교 ]
  if (typeof objA !== 'object' || typeof objB !== 'object') {
    return shallowEquals(objA, objB);
  }

  // null 체크 [ null 도 오브젝트다 ]
  if (objA === null || objB === null) {
    return objA === objB;
  }

  // 배열 처리 [ 배열도 오브젝트다 ]
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return (
      objA.length === objB.length &&
      objA.every((item, index) => deepEquals(item, objB[index]))
    );
  }

  // 일반 객체 처리
  const entriesA = Object.entries(objA as object).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );
  const entriesB = Object.entries(objB as object).sort(([keyA], [keyB]) =>
    keyA.localeCompare(keyB)
  );

  // 객체의 키-값 쌍 개수가 다르면 false 반환
  if (entriesA.length !== entriesB.length) {
    return false;
  }

  // 객체의 각 키-값 쌍을 재귀적으로 비교
  for (let i = 0; i < entriesA.length; i++) {
    // 값이 다르면 false 반환
    if (!deepEquals(entriesA[i][1], entriesB[i][1])) {
      return false;
    }
  }

  // 모든 키-값 쌍이 같으면 true 반환
  return true;
}

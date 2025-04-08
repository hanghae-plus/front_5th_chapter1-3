export function shallowEquals<T>(objA: T, objB: T): boolean {
  /**
   * 기본 타입 비교
   */
  if (Object.is(objA, objB)) {
    return true;
  }

  /**
   * 오브젝트 비교
   */
  if (
    typeof objA !== 'object' ||
    typeof objB !== 'object' ||
    objA === null ||
    objB === null
  ) {
    return false;
  }

  /**
   * 오브젝트 비교를 위한 객체 생성. 키 순서대로 정렬
   */
  const entries = Object.entries;
  const sort = (entries: [string, any][]) =>
    entries.sort(([a], [b]) => a.localeCompare(b));
  const entriesA = sort(entries(objA));
  const entriesB = sort(entries(objB));

  /**
   * 키 개수가 다르면 다른 객체
   */
  if (entriesA.length !== entriesB.length) {
    return false;
  }

  /**
   * 키와 값이 모두 같은지 비교
   */
  for (let i = 0; i < entriesA.length; i++) {
    const [key, value] = entriesA[i];
    const [keyB, valueB] = entriesB[i];
    if (key !== keyB || !Object.is(value, valueB)) {
      return false;
    }
  }

  return true;
}

export function deepEquals(objA: unknown, objB: unknown): boolean {
  if (objA === objB) {
    return true;
  }

  // if(typeof objA !== typeof objB) {
  //   return false;
  // };
  if (objA === null || objB === null) {
    return false;
  }

  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;

    for (let i = 0; i < objA.length; i++) {
      //재귀 부분이 제일 헷갈린다. 깊은 비교를 했을때 한번이라도 false가 나온다면 false, 모두 같아야 true여야하기에 for 문 밖에서 return true;
      if (!deepEquals(objA[i], objB[i])) return false;
    }
    return true;
  }

  if (typeof objA === "object" && typeof objB === "object") {
    console.log("objA:", objA, "objB:", objB);
    const a = objA as Record<string, unknown>;
    const b = objB as Record<string, unknown>;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    console.log("keysA:", keysA, "keysB:", keysB);

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

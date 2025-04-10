export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === null) {
    return objA === objB;
  }

  if (typeof objA !== typeof objB) {
    return false;
  }

  // 배열을 정확히 비교해야 한다
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      const v = objA[i];
      if (typeof v === "object") {
        const result = normalizeObject(v, objB[i]);
        if (!result) {
          return false;
        } else {
          return true;
        }
      }
    }

    return objA.toString() === objB.toString();
  }

  // 객체를 정확히 비교해야 한다
  if (typeof objA === "object" && typeof objB === "object") {
    const result = normalizeObject(objA, objB);
    return result;
  }

  return objA === objB;
}

function normalizeObject(
  objA: Record<string, unknown>,
  objB: Record<string, unknown>,
) {
  const objAkeys = Object.keys(objA);
  const objBkeys = Object.keys(objB);

  // 키의 길이가 다르면 false
  if (objAkeys.length !== objBkeys.length) return false;

  for (const [key, value] of Object.entries(objA)) {
    const value_objB = objB[key];
    if (typeof value !== "object") {
      if (value !== value_objB) {
        return false;
      }
    }

    if (typeof value === "object") {
      // 재귀함수 돌다가 false 뜨면 return 하고 종료
      if (!normalizeObject(value, value_objB)) {
        return false;
      }
    }
  }
  return true;
}

// function normalizeObject(objA, objB) {
//   let result = true;

//   Object.entries(objA).forEach(([key, value]) => {
//     const value_objB = objB[key];
//     if (typeof value !== "object") {
//       if (value !== value_objB) {
//         result = false;
//         return result;
//       }
//     }

//     if (typeof value === "object") {
//       // 재귀함수 돌다가 false 뜨면 return 하고 종료
//       if (!normalizeObject(value, value_objB)) {
//         result = false;
//         return result;
//       }
//     }
//   });
//   return result;
// }

export const deepEquals = <T>(objA: T, objB: T) => {
  if (Array.isArray(objA) && Array.isArray(objB)) {
    const isEqualLength = objA.length === objB.length;
    if (!isEqualLength) return false;

    const isEqualValues = objA.every((value, index) => {
      return deepEquals(value, objB[index]);
    });
    if (!isEqualValues) return false;

    return true;
  }

  const isObjectA = typeof objA === "object" && objA !== null;
  const isObjectB = typeof objB === "object" && objB !== null;

  if (isObjectA && isObjectB) {
    const isEqualLength = Object.keys(objA).length === Object.keys(objB).length;
    if (!isEqualLength) return false;

    const isEqualValues = Object.entries(objA).every(([key, value]) => {
      return deepEquals(value, objB[key as keyof typeof objB]);
    });
    if (!isEqualValues) return false;

    return true;
  }

  return objA === objB;
};

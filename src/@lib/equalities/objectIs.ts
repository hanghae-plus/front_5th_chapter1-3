const is = <T>(a: T, b: T): boolean => {
  // 두 값이 strict equality로 같으면
  if (a === b) {
    // 만약 두 값이 0이라면 (+0과 -0 구분)
    if (a === 0 && b === 0 && typeof a === "number" && typeof b === "number") {
      return 1 / a === 1 / b;
    }
    return true;
  }

  // 두 값이 다르지만, 모두 NaN인 경우 (NaN은 자기 자신과 같지 않음)
  if (typeof a === "number" && typeof b === "number") {
    if (isNaN(a) && isNaN(b)) {
      return true;
    }
  }

  return false;
};

const objectIs = <T>(a: T, b: T): boolean =>
  typeof Object.is === "function" ? Object.is(a, b) : is(a, b);

export default objectIs;

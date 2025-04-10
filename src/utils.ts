export function renderLog(message: string) {
  console.log(message);
}

// 대규모 데이터 생성 함수
export const generateItems = (count: number, start = 0) => {
  const categories = ["전자기기", "의류", "도서", "식품"];
  return Array.from({ length: count }, (_, index) => ({
    id: start + index,
    name: `상품 ${start + index}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.floor(Math.random() * 100000) + 1000,
  }));
};

//  객체 값인지 확인하는 함수
export function isObjectPair<T>(a: T, b: T): boolean {
  return (
    typeof a === "object" && a !== null && typeof b === "object" && b !== null
  );
}

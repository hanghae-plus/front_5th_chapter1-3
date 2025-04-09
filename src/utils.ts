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

export const isPrimitiveValue = <T>(value: T): boolean => {
  return (
    typeof value === "bigint" ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string" ||
    typeof value === "symbol" ||
    typeof value === "undefined"
  );
};

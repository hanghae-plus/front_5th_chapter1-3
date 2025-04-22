import { memo, useMemo, useState } from "react";
import { renderLog } from "../utils";
import { useTheme } from "../contexts/ThemeContext";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

// 개별 아이템 컴포넌트
const ItemCard = memo(({ item, theme }: { item: Item; theme: string }) => {
  return (
    <li
      className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
    >
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
});

// ItemList 컴포넌트
export const ItemList: React.FC<{
  items: Item[];
  onAddItemsClick: () => void;
}> = memo(({ items, onAddItemsClick }) => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useTheme();

  // filter나 items가 변경될 때만 재계산
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  // 계산된 값들도 메모이제이션
  const { totalPrice, averagePrice } = useMemo(() => {
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    const average = Math.round(total / filteredItems.length) || 0;
    return { totalPrice: total, averagePrice: average };
  }, [filteredItems]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={onAddItemsClick}
          >
            대량추가
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
      />
      <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} theme={theme} />
        ))}
      </ul>
    </div>
  );
});

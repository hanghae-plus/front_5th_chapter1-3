import { useState } from "react";
import { renderLog } from "../utils";
import { useThemeContext } from "../contexts/theme/useThemeContext";
import { memo } from "../@lib";

// 타입 정의
interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

// ItemList 컴포넌트
export const ItemList: React.FC<{
  items: Item[];
  onAddItemsClick: () => void;
}> = memo(({ items, onAddItemsClick }) => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useThemeContext();

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="px-4 py-2 text-xs font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
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
        className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
      />
      <ul className="flex justify-end gap-3 mx-4 mb-4 text-sm">
        <li>검색결과: {filteredItems.length.toLocaleString()}개</li>
        <li>전체가격: {totalPrice.toLocaleString()}원</li>
        <li>평균가격: {averagePrice.toLocaleString()}원</li>
      </ul>
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
});

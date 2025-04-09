import { memo, useMemo, useState } from "react";
import { renderLog } from "../utils";
import { useThemeContext } from "../context/ThemeContext";

interface Item {
  id: number;
  name: string;
  category: string;
  price: number;
}

// ItemList 컴포넌트
// memo 는 이전 props와 비교 후 바뀐게 없으면 리렌더링을 막는다.
// memo를 사용할때 들어온 인자값이 함수면 그 함수는 반드시 useCallback으로 감싼다.
export const ItemList: React.FC<{
  items: Item[];
  onAddItemsClick: () => void;
}> = memo(({ items, onAddItemsClick }) => {
  renderLog("ItemList rendered");
  const [filter, setFilter] = useState("");
  const { theme } = useThemeContext();

  // 복잡한 계산, filter map 일때 사용
  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.category.toLowerCase().includes(filter.toLowerCase()),
      ),
    [items, filter],
  );

  // 복잡한 계산, filter map 일때 사용
  const totalPrice = useMemo(
    () => filteredItems.reduce((sum, item) => sum + item.price, 0),
    [filteredItems],
  );

  // 복잡한 계산, filter map 일때 사용
  const averagePrice = useMemo(
    () => Math.round(totalPrice / filteredItems.length) || 0,
    [totalPrice, filteredItems.length],
  );

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

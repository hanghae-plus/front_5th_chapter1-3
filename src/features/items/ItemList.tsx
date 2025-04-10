import { memo } from "../../@lib";
import { renderLog } from "../../utils";
import { useThemeContext } from "../theme/ThemeContext";
import { useItemList } from "./useItemList";

const ItemList: React.FC = memo(() => {
  renderLog("ItemList rendered");

  const { theme } = useThemeContext();

  const {
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
    onAddItemsClick,
  } = useItemList();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <button
          onClick={onAddItemsClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
        >
          대량추가
        </button>
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
          <li
            key={item.id}
            className={`p-2 rounded shadow ${theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
          >
            {item.name} - {item.category} - {item.price.toLocaleString()}원
          </li>
        ))}
      </ul>
    </div>
  );
});

export default ItemList;

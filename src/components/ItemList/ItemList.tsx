import { memo } from "../../hocs";
import { renderLog } from "../../utils";
import { ItemListHeader } from "./ItemListHeader";
import { ItemListStats } from "./ItemListStats";
import { ItemRow } from "./ItemRow";
import { Input } from "../common";
import { useItemList } from "../../hooks";
import { useThemeState } from "../../context";

export const ItemList: React.FC = memo(() => {
  renderLog("ItemList rendered");

  const theme = useThemeState();
  const {
    addItems,
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
  } = useItemList();

  return (
    <div className="mt-8">
      <ItemListHeader onAddItemsClick={addItems} />
      <Input
        type="text"
        name="filter"
        placeholder="상품 검색..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4"
      />
      <ItemListStats
        count={filteredItems.length}
        totalPrice={totalPrice}
        averagePrice={averagePrice}
      />
      <ul className="space-y-2">
        {filteredItems.map((item) => (
          <ItemRow key={item.id} item={item} theme={theme} />
        ))}
      </ul>
    </div>
  );
});

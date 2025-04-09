import { useItemData } from "./useItemData";
import { useItemFilter } from "./useItemFilter";
import { useItemStats } from "./useItemStats";

export function useItemList() {
  const { items, addItems } = useItemData();
  const { filter, setFilter, filteredItems } = useItemFilter(items);
  const { totalPrice, averagePrice } = useItemStats(filteredItems);

  return {
    filter,
    setFilter,
    filteredItems,
    totalPrice,
    averagePrice,
    addItems,
  };
}

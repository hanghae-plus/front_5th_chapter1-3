import { useMemo } from "../../hooks";
import { Item } from "../../types";

export function useItemStats(filteredItems: Item[]) {
  const totalPrice = useMemo(() => {
    return filteredItems.reduce((sum, item) => sum + item.price, 0);
  }, [filteredItems]);

  const averagePrice = useMemo(() => {
    return Math.round(totalPrice / filteredItems.length) || 0;
  }, [totalPrice, filteredItems.length]);

  return { totalPrice, averagePrice };
}

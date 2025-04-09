import { useState } from "react";

import { Product } from "@/features/product/model";

interface UseProductListProps {
  products: Product[];
}

export const useProductList = ({ products }: UseProductListProps) => {
  const [filter, setFilter] = useState("");

  const filteredItems = products.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  );

  const totalPrice = filteredItems.reduce((sum, item) => sum + item.price, 0);

  const averagePrice = Math.round(totalPrice / filteredItems.length) || 0;

  return { filter, filteredItems, totalPrice, averagePrice, setFilter };
};

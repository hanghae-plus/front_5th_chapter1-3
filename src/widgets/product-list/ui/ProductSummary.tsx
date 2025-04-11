import { Product } from "@/features/product/model";

import { formatPrice } from "../lib/formatPrice";

interface ProductSummaryProps {
  filteredItems: Product[];
  totalPrice: number;
  averagePrice: number;
}

export function ProductSummary({
  filteredItems,
  totalPrice,
  averagePrice,
}: ProductSummaryProps) {
  return (
    <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
      <li>검색결과: {formatPrice(filteredItems.length)}개</li>
      <li>전체가격: {formatPrice(totalPrice)}원</li>
      <li>평균가격: {formatPrice(averagePrice)}원</li>
    </ul>
  );
}

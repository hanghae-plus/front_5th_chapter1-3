import { memo } from "../../hocs";

interface ItemListStatsProps {
  count: number;
  totalPrice: number;
  averagePrice: number;
}

export const ItemListStats = memo(
  ({ count, totalPrice, averagePrice }: ItemListStatsProps) => (
    <ul className="mb-4 mx-4 flex gap-3 text-sm justify-end">
      <li>검색결과: {count.toLocaleString()}개</li>
      <li>전체가격: {totalPrice.toLocaleString()}원</li>
      <li>평균가격: {averagePrice.toLocaleString()}원</li>
    </ul>
  )
);

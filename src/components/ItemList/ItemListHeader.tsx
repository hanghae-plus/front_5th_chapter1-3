import { memo } from "../../hocs";
import { Button } from "../common";

interface ItemListHeaderProps {
  onAddItemsClick: () => void;
}

export const ItemListHeader = memo(
  ({ onAddItemsClick }: ItemListHeaderProps) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">상품 목록</h2>
      <div>
        <Button onClick={onAddItemsClick} className="text-xs">
          대량추가
        </Button>
      </div>
    </div>
  )
);

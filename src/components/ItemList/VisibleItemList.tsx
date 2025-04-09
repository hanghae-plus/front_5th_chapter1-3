// 미사용 코드

import { memo } from "../../hocs";
import { Item } from "../../types";
import { ItemRow } from "./ItemRow";

interface Props {
  getItem: (index: number) => Item;
  itemCount: number;
  theme: "light" | "dark";
  startIndex: number;
  endIndex: number;
  itemHeight: number;
}

export const VisibleItemList: React.FC<Props> = memo(
  ({ getItem, itemCount, theme, startIndex, endIndex, itemHeight }) => {
    console.log("data", itemCount, startIndex, endIndex, itemHeight, theme);
    const visibleCount = endIndex - startIndex;
    return (
      <>
        {Array.from({ length: visibleCount }).map((_, i) => {
          const actualIndex = startIndex + i;
          const item = getItem(actualIndex);
          if (!item) return null;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              <ItemRow item={item} theme={theme} />
            </div>
          );
        })}
      </>
    );
  }
);

// const ITEM_HEIGHT = 40;

// export const ItemList: React.FC<{
//   items: Item[];
//   onAddItemsClick: () => void;
// }> = memo(({ items, onAddItemsClick }) => {
//   ...
//   const listRef = useRef<HTMLDivElement>(null);

//   const { startIndex, endIndex } = useVirtualScroll({
//     containerRef: listRef,
//     itemHeight: ITEM_HEIGHT,
//     itemCount: filteredItems.length,
//   });

//   return (
//     <div className="mt-8">
//       ...
//       <div
//         ref={listRef}
//         style={{
//           position: "relative",
//           height: filteredItems.length * ITEM_HEIGHT,
//         }}
//       >
//         <VisibleItemList
//           getItem={(index) => filteredItems[index]}
//           itemCount={filteredItems.length}
//           theme={theme}
//           startIndex={startIndex}
//           endIndex={endIndex}
//           itemHeight={ITEM_HEIGHT}
//         />
//       </div>
//     </div>
//   );
// });

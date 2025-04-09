import { useTheme } from "@app/model";
import { useProducts } from "@features/product/model/ProductProvider";

import { renderLog } from "@shared/tests/renderLog";

import { useProductList } from "../model";
import { ProductItem } from "./ProductItem";
import { ProductSummary } from "./ProductSummary";

export function ProductList() {
  renderLog("ProductList rendered");

  const { theme } = useTheme();
  const { products, addProducts } = useProducts();
  const { filter, filteredItems, totalPrice, averagePrice, setFilter } =
    useProductList({ products });

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">상품 목록</h2>
        <div>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
            onClick={addProducts}
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
      <ProductSummary
        filteredItems={filteredItems}
        totalPrice={totalPrice}
        averagePrice={averagePrice}
      />
      <ul className="space-y-2">
        {filteredItems.map((item, index) => (
          <ProductItem key={index} theme={theme} item={item} />
        ))}
      </ul>
    </div>
  );
}

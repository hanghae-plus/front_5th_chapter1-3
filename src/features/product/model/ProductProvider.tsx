import { createContext, useContext, useState } from "react";

import { generateItems } from "@/utils";

import { Product } from "./types";

type ProductContextType = {
  products: Product[];
  addProducts: () => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(generateItems(1000));

  const addProducts = () => {
    setProducts((prevProducts) => [
      ...prevProducts,
      ...generateItems(1000, prevProducts.length),
    ]);
  };

  const value = { products, addProducts };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
}

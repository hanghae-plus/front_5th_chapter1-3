import { cva } from "class-variance-authority";

import { Theme } from "@/app/model";
import { Product } from "@/features/product/model";

const productItemVariants = cva("p-2 rounded shadow", {
  variants: {
    theme: {
      light: "bg-white text-black",
      dark: "bg-gray-700 text-white",
    },
  },
});

interface ProductItemProps {
  theme: Theme;
  item: Product;
}

export function ProductItem({ theme, item }: ProductItemProps) {
  return (
    <li className={productItemVariants({ theme })}>
      {item.name} - {item.category} - {item.price.toLocaleString()}원
    </li>
  );
}

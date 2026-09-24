import { useMemo } from "react";
import { PRODUCTS } from "@/data/products";
import { useInventoryStore } from "@/store/useInventoryStore";
import { Product } from "@/types";

export const useEffectiveProducts = (): Product[] => {
  const overrides = useInventoryStore((state) => state.overrides);

  return useMemo(() => {
    return PRODUCTS.map((product) => ({
      ...product,
      inStock: overrides[product.id]?.inStock ?? product.inStock,
      stockCount: overrides[product.id]?.stockCount ?? product.stockCount,
    }));
  }, [overrides]);
}

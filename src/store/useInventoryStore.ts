import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PRODUCTS } from "@/data/products";

interface StockOverride {
  inStock: boolean;
  stockCount: number;
}

interface InventoryState {
  overrides: Record<string, StockOverride>;
  toggleInStock: (productId: string) => void;
  setStockCount: (productId: string, stockCount: number) => void;
}

const initialOverrides: Record<string, StockOverride> = Object.fromEntries(
  PRODUCTS.map((product) => [product.id, { inStock: product.inStock, stockCount: product.stockCount }])
);

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      overrides: initialOverrides,

      toggleInStock: (productId) =>
        set((state) => ({
          overrides: {
            ...state.overrides,
            [productId]: {
              ...state.overrides[productId],
              inStock: !state.overrides[productId].inStock,
            },
          },
        })),

      setStockCount: (productId, stockCount) =>
        set((state) => ({
          overrides: {
            ...state.overrides,
            [productId]: {
              ...state.overrides[productId],
              stockCount,
              inStock: stockCount > 0,
            },
          },
        })),
    }),
    {
      name: "dual-role-commerce/inventory",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

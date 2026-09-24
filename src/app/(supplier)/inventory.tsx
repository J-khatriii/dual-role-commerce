import { RoleHeader } from "@/components/RoleHeader";
import { StockEditSheet } from "@/components/StockEditSheet";
import { colors } from "@/constants/theme";
import { useEffectiveProducts } from "@/hooks/useEffectiveProducts";
import { useInventoryStore } from "@/store/useInventoryStore";
import { Product } from "@/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InventoryScreen = () => {
  const products = useEffectiveProducts();
  const toggleInStock = useInventoryStore((state) => state.toggleInStock);
  const setStockCount = useInventoryStore((state) => state.setStockCount);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const sheetRef = useRef<BottomSheetModal>(null);

  const openEditSheet = (product: Product) => {
    setEditingProduct(product);
    sheetRef.current?.present();
  };

  const handleSave = (stockCount: number) => {
    if (editingProduct) setStockCount(editingProduct.id, stockCount);
    sheetRef.current?.dismiss();
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["top"]}
    >
      <RoleHeader title="Inventory" />

      <FlashList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.stock}>{item.stockCount} in stock</Text>
            </View>
            <Pressable
              onPress={() => openEditSheet(item)}
              style={styles.editButton}
            >
              <Text style={styles.editText}>Edit</Text>
            </Pressable>
            <Switch
              value={item.inStock}
              onValueChange={() => toggleInStock(item.id)}
            />
          </View>
        )}
      />

      <StockEditSheet
        ref={sheetRef}
        product={editingProduct}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgElevated,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  stock: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editText: { fontSize: 12, color: colors.textPrimary, fontWeight: "600" },
});

export default InventoryScreen;

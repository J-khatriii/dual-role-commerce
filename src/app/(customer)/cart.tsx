import { CartItemRow } from "@/components/CartItemRow";
import { EmptyState } from "@/components/EmptyState";
import { RoleHeader } from "@/components/RoleHeader";
import { colors } from "@/constants/theme";
import { PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const cartRows = useMemo(() => {
    return items
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((row) => row !== null);
  }, [items]);

  const total = useMemo(() => {
    return cartRows.reduce(
      (sum, row) => sum + row.product.price * row.quantity,
      0,
    );
  }, [cartRows]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <RoleHeader title="Cart" />

      <FlashList
        data={cartRows}
        keyExtractor={(row) => row.product.id}
        contentContainerStyle={{ padding: 8, flexGrow: 1 }}
        renderItem={({ item: row }) => (
          <CartItemRow
            product={row.product}
            quantity={row.quantity}
            onIncrease={() => setQuantity(row.product.id, row.quantity + 1)}
            onDecrease={() =>
              row.quantity <= 1
                ? removeItem(row.product.id)
                : setQuantity(row.product.id, row.quantity - 1)
            }
            onDelete={() => removeItem(row.product.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Your cart is empty"
            subtitle="Add products from the catalog to see them here."
          />
        }
      />

      {cartRows.length > 0 && (
        <View style={styles.totalBar}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  totalBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.bgElevated,
  },
  totalLabel: { fontSize: 15, color: colors.textSecondary },
  totalValue: { fontSize: 18, fontWeight: "700", color: colors.textPrimary },
});

export default CartScreen;

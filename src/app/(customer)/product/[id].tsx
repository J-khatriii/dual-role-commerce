import { AddToCartButton } from "@/components/AddToCartButton";
import { colors } from "@/constants/theme";
import { useEffectiveProducts } from "@/hooks/useEffectiveProducts";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const products = useEffectiveProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <SafeAreaView style={styles.center} edges={["top"]}>
        <Text style={styles.notFound}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.swatch, { backgroundColor: product.imageColor }]}
        />

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>₹{product.price}</Text>

        {!product.inStock && (
          <Text style={styles.outOfStock}>Out of stock</Text>
        )}

        {product.inStock && <AddToCartButton productId={product.id} />}

        <Text style={styles.description}>{product.description}</Text>

        <Text style={styles.specsTitle}>Specifications</Text>
        {Object.entries(product.specs).map(([key, value]) => (
          <View key={key} style={styles.specRow}>
            <Text style={styles.specKey}>{key}</Text>
            <Text style={styles.specValue}>{value}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg,
  },
  notFound: { color: colors.textSecondary },
  swatch: {
    height: 180,
    borderRadius: 18,
    marginBottom: 16,
    marginTop: 6,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  name: { fontSize: 22, fontWeight: "700", color: colors.textPrimary },
  category: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  price: { fontSize: 20, fontWeight: "700", color: colors.brand, marginTop: 8 },
  outOfStock: {
    fontSize: 13,
    color: colors.danger,
    marginTop: 6,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 16,
    lineHeight: 22,
  },
  specsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 24,
    marginBottom: 8,
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  specKey: { fontSize: 13, color: colors.textSecondary },
  specValue: { fontSize: 13, color: colors.textPrimary, fontWeight: "600" },
});

export default ProductDetail;

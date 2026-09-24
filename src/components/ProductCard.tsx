import { colors } from "@/constants/theme";
import { Product } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard = ({ product, onPress }: ProductCardProps) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={[styles.swatch, { backgroundColor: product.imageColor }]} />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>₹{product.price}</Text>
      {!product.inStock && <Text style={styles.outOfStock}>Out of stock</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 16,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  swatch: {
    height: 90,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  price: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  outOfStock: {
    fontSize: 11,
    color: colors.danger,
    marginTop: 4,
    fontWeight: "600",
  },
});

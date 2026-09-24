import { CategoryChips } from "@/components/CategoryChips";
import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { RoleHeader } from "@/components/RoleHeader";
import { colors } from "@/constants/theme";
import { CATEGORIES } from "@/data/products";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useEffectiveProducts } from "@/hooks/useEffectiveProducts";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerCatalog = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const debouncedSearchText = useDebouncedValue(searchText, 300);
  const effectiveProducts = useEffectiveProducts();

  const filteredProducts = useMemo(() => {
    return effectiveProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === null || product.category === selectedCategory;
      const matchesSearch = product.name
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [effectiveProducts, debouncedSearchText, selectedCategory]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <RoleHeader title="Catalog" />

      <TextInput
        placeholder="Search products..."
        placeholderTextColor={colors.textMuted}
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />

      <CategoryChips
        categories={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <FlashList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => router.push(`/(customer)/product/${item.id}`)}
          />
        )}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={
          <EmptyState
            title="No products found"
            subtitle="Try a different search term or clear the category filter."
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchInput: {
    marginHorizontal: 8,
    marginBottom: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textPrimary,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});

export default CustomerCatalog;

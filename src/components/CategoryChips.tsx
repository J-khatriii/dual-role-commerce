import { colors } from "@/constants/theme";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

interface CategoryChipsProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export const CategoryChips = ({
  categories,
  selected,
  onSelect,
}: CategoryChipsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
      contentContainerStyle={{ gap: 8 }}
    >
      <Pressable
        style={[styles.chip, selected === null && styles.chipActive]}
        onPress={() => onSelect(null)}
      >
        <Text
          style={[styles.chipText, selected === null && styles.chipTextActive]}
        >
          All
        </Text>
      </Pressable>
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <Pressable
            key={category}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onSelect(isActive ? null : category)}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: { paddingHorizontal: 8, marginBottom: 10, flexGrow: 0 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.bgElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  chipText: { fontSize: 13, color: colors.textSecondary, fontWeight: "600" },
  chipTextActive: { color: "#FFFFFF" },
});

import { colors } from "@/constants/theme";
import { Product } from "@/types";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput } from "react-native";

interface StockEditSheetProps {
  product: Product | null;
  onSave: (stockCount: number) => void;
}

export const StockEditSheet = forwardRef<BottomSheetModal, StockEditSheetProps>(
  ({ product, onSave }, ref) => {
    const [value, setValue] = useState("");

    useEffect(() => {
      if (product) setValue(String(product.stockCount));
    }, [product]);

    const handleSave = () => {
      const parsed = parseInt(value, 10);
      onSave(isNaN(parsed) ? 0 : parsed);
    };

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={["35%"]}
        backgroundStyle={styles.sheetBg}
      >
        <BottomSheetView style={styles.content}>
          <Text style={styles.title}>{product?.name}</Text>
          <Text style={styles.label}>Stock count</Text>
          <TextInput
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            style={styles.input}
          />
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  sheetBg: { backgroundColor: colors.bgElevated },
  content: { padding: 20 },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  label: { fontSize: 13, color: colors.textSecondary, marginBottom: 8 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.brand,
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
  },
  saveText: { color: "#FFFFFF", fontWeight: "700" },
});

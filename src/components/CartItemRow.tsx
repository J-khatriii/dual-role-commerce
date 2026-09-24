import { colors } from "@/constants/theme";
import { Product } from "@/types";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface CartItemRowProps {
  product: Product;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
}

const SWIPE_THRESHOLD = -100;

export const CartItemRow = ({
  product,
  quantity,
  onIncrease,
  onDecrease,
  onDelete,
}: CartItemRowProps) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = Math.min(0, event.translationX);
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-500, { duration: 200 }, () => {
          runOnJS(onDelete)();
        });
      } else {
        translateX.value = withTiming(0, { duration: 200 });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.wrapper}>
      <View style={styles.deleteBackground}>
        <Text style={styles.deleteText}>Remove</Text>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.row, animatedStyle]}>
          <View
            style={[styles.swatch, { backgroundColor: product.imageColor }]}
          />

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {product.name}
            </Text>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>

          <View style={styles.quantityControls}>
            <Pressable style={styles.qtyButton} onPress={onDecrease}>
              <Text style={styles.qtyButtonText}>−</Text>
            </Pressable>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <Pressable style={styles.qtyButton} onPress={onIncrease}>
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 8,
    marginBottom: 10,
    borderRadius: 14,
    overflow: "hidden",
  },
  deleteBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.danger,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20,
  },
  deleteText: { color: "#FFFFFF", fontWeight: "700" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgElevated,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  swatch: { width: 48, height: 48, borderRadius: 12 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: "600", color: colors.textPrimary },
  price: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  quantityControls: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  qtyButtonText: { fontSize: 16, fontWeight: "700", color: colors.textPrimary },
  qtyValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    minWidth: 20,
    textAlign: "center",
  },
});

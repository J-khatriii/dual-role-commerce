import { colors } from "@/constants/theme";
import { useCartStore } from "@/store/useCartStore";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

interface AddToCartButtonProps {
  productId: string;
}

export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const [justAdded, setJustAdded] = useState(false);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    addItem(productId);
    setJustAdded(true);

    scale.value = withSequence(
      withTiming(1.3, { duration: 150 }),
      withTiming(1, { duration: 150 }),
    );

    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>Add to Cart</Text>
      {justAdded && (
        <Animated.View style={[styles.badge, animatedStyle]}>
          <Text style={styles.badgeText}>Added</Text>
        </Animated.View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    backgroundColor: colors.brand,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    shadowColor: colors.brand,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  buttonText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF" },
  badge: {
    position: "absolute",
    top: -14,
    right: -8,
    backgroundColor: colors.success,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { fontSize: 11, fontWeight: "700", color: "#FFFFFF" },
});

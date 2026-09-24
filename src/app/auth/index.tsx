import { colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { Role } from "@/types";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RoleSelector = () => {
  const signIn = useAuthStore((state) => state.signIn);

  const handleSelect = (role: Role) => {
    signIn(role);
    router.replace(role === "customer" ? "/(customer)" : "/(supplier)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <Text style={styles.title}>Choose how you're signing in</Text>

      <Pressable style={styles.card} onPress={() => handleSelect("customer")}>
        <Text style={styles.cardTitle}>Customer</Text>
      </Pressable>

      <Pressable style={styles.card} onPress={() => handleSelect("supplier")}>
        <Text style={styles.cardTitle}>Supplier</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgElevated,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
  },
  cardTitle: { fontSize: 17, fontWeight: "600", color: colors.textPrimary },
});

export default RoleSelector;

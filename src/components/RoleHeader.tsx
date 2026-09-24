import { colors } from "@/constants/theme";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface RoleHeaderProps {
  title: string;
}

export const RoleHeader = ({ title }: RoleHeaderProps) => {
  const signOut = useAuthStore((state) => state.signOut);

  const handleSwitchRole = () => {
    signOut();
    router.replace("/auth");
  };

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={handleSwitchRole}>
        <Text style={styles.switchText}>Switch role</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.bg,
  },
  title: { fontSize: 20, fontWeight: "700", color: colors.textPrimary },
  switchText: { fontSize: 14, fontWeight: "600", color: colors.brand },
});

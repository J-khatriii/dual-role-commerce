import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const activeAccount = useAuthStore((state) => state.activeAccount);

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!activeAccount) {
    return <Redirect href="/auth" />;
  }

  return (
    <Redirect
      href={activeAccount.role === "customer" ? "/(customer)" : "/(supplier)"}
    />
  );
}

export default Index;

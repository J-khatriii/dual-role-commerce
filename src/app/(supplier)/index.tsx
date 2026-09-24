import { CategoryPieChart } from "@/components/CategoryPieChart";
import { RevenueChart } from "@/components/RevenueChart";
import { RoleHeader } from "@/components/RoleHeader";
import { colors } from "@/constants/theme";
import { CATEGORY_BREAKDOWN, REVENUE_TREND } from "@/data/analytics";
import { SafeAreaView } from "react-native-safe-area-context";

const SupplierDashboard = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={["top"]}
    >
      <RoleHeader title="Dashboard" />
      <RevenueChart data={REVENUE_TREND} />
      <CategoryPieChart data={CATEGORY_BREAKDOWN} />
    </SafeAreaView>
  );
};

export default SupplierDashboard;

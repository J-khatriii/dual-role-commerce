import { colors } from "@/constants/theme";
import { RevenuePoint } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

interface RevenueChartProps {
  data: RevenuePoint[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const chartData = data.map((point) => ({
    value: point.value,
    label: point.label,
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Revenue this week</Text>
      <LineChart
        data={chartData}
        color={colors.brand}
        thickness={3}
        yAxisTextStyle={{ color: colors.textSecondary }}
        xAxisLabelTextStyle={{ color: colors.textSecondary }}
        hideRules
        noOfSections={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#9AA7C8",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
});

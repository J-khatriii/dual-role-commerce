import { colors } from "@/constants/theme";
import { CategoryBreakdown } from "@/types";
import { StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

interface CategoryPieChartProps {
  data: CategoryBreakdown[];
}

export const CategoryPieChart = ({ data }: CategoryPieChartProps) => {
  const chartData = data.map((entry) => ({
    value: entry.value,
    color: entry.color,
    text: entry.category,
  }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sales by category</Text>
      <View style={{ alignItems: "center" }}>
        <PieChart data={chartData} donut radius={80} innerRadius={50} />
      </View>
      <View style={styles.legend}>
        {data.map((entry) => (
          <View key={entry.category} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: entry.color }]} />
            <Text style={styles.legendText}>{entry.category}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 16,
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
  legend: { marginTop: 12, gap: 6 },
  legendRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: colors.textSecondary },
});

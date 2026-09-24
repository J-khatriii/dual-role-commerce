import { RevenuePoint, CategoryBreakdown } from "@/types";

export const REVENUE_TREND: RevenuePoint[] = [
  { label: "Mon", value: 12000 },
  { label: "Tue", value: 15500 },
  { label: "Wed", value: 9800 },
  { label: "Thu", value: 18200 },
  { label: "Fri", value: 21000 },
  { label: "Sat", value: 26400 },
  { label: "Sun", value: 19700 },
];

export const CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  { category: "Electronics", value: 42, color: "#6366F1" },
  { category: "Home", value: 28, color: "#F59E0B" },
  { category: "Sports", value: 30, color: "#22D3EE" },
];

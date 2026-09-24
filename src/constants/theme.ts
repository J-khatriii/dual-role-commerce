export const colors = {
  bg: "#F5F7FF",
  bgElevated: "#FFFFFF",
  surface: "#EEF4FF",
  surfaceAlt: "#E7EEFF",
  border: "#D7E1FF",
  textPrimary: "#172033",
  textSecondary: "#4E5D7A",
  textMuted: "#7383A1",
  brand: "#6D7CFF",
  brandMuted: "#5869F4",
  accent: "#66D3E8",
  success: "#3CC98B",
  danger: "#F06B6B",
  warning: "#F5B75D",
  customerRole: "#6D7CFF",
  supplierRole: "#F5A65B",
  chatBubbleMine: "#6D7CFF",
  chatBubbleTheirs: "#EEF3FF",
} as const;

export const Colors = {
  light: colors,
  dark: colors,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;
export const radii = { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 } as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: "700" as const },
  h2: { fontSize: 22, fontWeight: "700" as const },
  h3: { fontSize: 17, fontWeight: "600" as const },
  body: { fontSize: 15, fontWeight: "400" as const },
  caption: { fontSize: 13, fontWeight: "400" as const },
  label: { fontSize: 12, fontWeight: "600" as const, letterSpacing: 0.4 },
};

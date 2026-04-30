export const theme = {
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",

    border: "#E2E8F0",
    borderLight: "#CBD5E1",

    text: "#0F172A",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",
    textOnPrimary: "#FFFFFF",
    textOnDark: "rgba(255,255,255,0.85)",

    primary: "#0F766E",
    primaryStrong: "#115E59",
    primarySoft: "#CCFBF1",

    danger: "#DC2626",
    dangerSoft: "#FEE2E2",

    warning: "#D97706",
    warningSoft: "#FEF3C7",

    chip: {
      border: "#CBD5E1",
      background: "#FFFFFF",
      text: "#334155",
      activeBackground: "#0F766E",
      activeBorder: "#0F766E",
      activeText: "#FFFFFF",
    },
  },

  fonts: {
    size: {
      xs: 12,
      sm: 13,
      md: 14,
      lg: 15,
      xl: 16,
      xxl: 18,
      xxxl: 20,
      xxxxl: 24,
      header: 28,
      hero: 30,
    },
    weight: {
      regular: "400" as const,
      semibold: "600" as const,
      bold: "700" as const,
      extrabold: "800" as const,
      black: "900" as const,
    },
  },

  gradients: {
    hero: ["#134E4A", "#0F766E", "#14B8A6"] as const,
    darkCard: ["#0F172A", "#1E293B"] as const,
    background: ["#F8FAFC", "#F1F5F9"] as const,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    xxl: 28,
    pill: 999,
  },

  shadow: {
    card: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.06,
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 16,
      elevation: 3,
    },
    hero: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 18,
      elevation: 5,
    },
  },
} as const;

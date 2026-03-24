export const theme = {
  colors: {
    background: "#F8FAFC",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5F9",

    border: "#E2E8F0",

    text: "#0F172A",
    textSecondary: "#64748B",
    textMuted: "#94A3B8",

    primary: "#0F766E",
    primaryStrong: "#115E59",
    primarySoft: "#CCFBF1",

    danger: "#DC2626",
    dangerSoft: "#FEE2E2",

    warning: "#D97706",
    warningSoft: "#FEF3C7",
  },

  gradients: {
    hero: ["#134E4A", "#0F766E", "#14B8A6"] as const,
    darkCard: ["#0F172A", "#1E293B"] as const,
  },

  category: {
    electronics: {
      background: "#DBEAFE",
      text: "#1D4ED8",
    },
    clothes: {
      background: "#FCE7F3",
      text: "#BE185D",
    },
    food: {
      background: "#DCFCE7",
      text: "#15803D",
    },
    home: {
      background: "#FEF3C7",
      text: "#B45309",
    },
    beauty: {
      background: "#EDE9FE",
      text: "#7C3AED",
    },
    other: {
      background: "#E2E8F0",
      text: "#475569",
    },
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

import { Platform } from "react-native";

// Official Vercel Geist UI theme colors
export const theme = {
  colors: {
    // Core colors from Geist UI
    background: "#000000", // Black
    foreground: "#ffffff", // White
    text: "#ffffff",
    
    // Primary colors
    primary: "#000000", // Black
    secondary: "#ffffff", // White
    success: "#0070f3", // Blue
    error: "#f31260", // Red
    warning: "#f5a623", // Orange
    
    // Accents (Geist grayscale)
    accents_1: "#111111",
    accents_2: "#333333",
    accents_3: "#444444",
    accents_4: "#666666",
    accents_5: "#888888",
    accents_6: "#999999",
    accents_7: "#eaeaea",
    accents_8: "#fafafa",
    
    // Highlight colors
    violet: "#7928ca",
    cyan: "#50e3c2",
    purple: "#f81ce5",
    link: "#0070f3",
    
    // UI specific colors
    primaryAccent: "#0070f3", // Geist blue
    secondaryAccent: "#7928ca", // Geist violet
    subtleGray: "#333333",
    darkOverlay: "#0A0A0A",
    widgetBackground: "#111111",
    selectionTint: "rgba(0, 112, 243, 0.33)", // #0070f355
    focusTint: "rgba(121, 40, 202, 0.33)", // #7928ca55
    code: "#f81ce5",
  },
  
  // Spacing follows Geist UI's 4-point grid system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Typography
  fontSizes: {
    tiny: 12,
    small: 14,
    normal: 16,
    large: 18,
    xlarge: 20,
    xxlarge: 24,
    huge: 28,
    xhuge: 32,
    display: 36,
  },
  
  // Border radius
  radius: {
    xs: 2,
    sm: 5,
    md: 8,
    lg: 14,
    pill: 999,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Animation
  animation: {
    fast: 150,
    normal: 250,
    slow: 450,
  },
};

export const tabBarStyle = Platform.select({
  web: {
    backgroundColor: theme.colors.accents_1,
    borderTopColor: theme.colors.accents_2,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
  },
  default: {
    backgroundColor: theme.colors.accents_1,
    borderTopColor: theme.colors.accents_2,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
  },
});

// Geist UI inspired component styles
export const geistStyles = {
  // Button styles
  button: {
    primary: {
      backgroundColor: theme.colors.primaryAccent,
      color: theme.colors.foreground,
      borderRadius: theme.radius.sm,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    secondary: {
      backgroundColor: theme.colors.accents_2,
      color: theme.colors.foreground,
      borderRadius: theme.radius.sm,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.colors.primaryAccent,
      borderRadius: theme.radius.sm,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
  },
  
  // Card styles
  card: {
    container: {
      backgroundColor: theme.colors.accents_1,
      borderRadius: theme.radius.md,
      padding: theme.spacing.md,
      ...theme.shadows.small,
    },
    header: {
      marginBottom: theme.spacing.sm,
    },
    content: {
      marginVertical: theme.spacing.xs,
    },
    footer: {
      marginTop: theme.spacing.sm,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  },
  
  // Input styles
  input: {
    container: {
      backgroundColor: theme.colors.accents_1,
      borderColor: theme.colors.accents_2,
      borderWidth: 1,
      borderRadius: theme.radius.sm,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.sm,
      color: theme.colors.text,
    },
    focus: {
      borderColor: theme.colors.primaryAccent,
    },
    error: {
      borderColor: theme.colors.error,
    },
    label: {
      color: theme.colors.accents_5,
      fontSize: theme.fontSizes.small,
      marginBottom: theme.spacing.xs,
    },
  },
  
  // Text styles
  text: {
    h1: {
      fontSize: theme.fontSizes.xhuge,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    h2: {
      fontSize: theme.fontSizes.huge,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
    },
    h3: {
      fontSize: theme.fontSizes.xxlarge,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    h4: {
      fontSize: theme.fontSizes.xlarge,
      fontWeight: 'bold',
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    p: {
      fontSize: theme.fontSizes.normal,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
    },
    small: {
      fontSize: theme.fontSizes.small,
      color: theme.colors.accents_5,
    },
    code: {
      fontFamily: 'monospace',
      fontSize: theme.fontSizes.small,
      backgroundColor: theme.colors.accents_1,
      color: theme.colors.code,
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: 2,
      borderRadius: theme.radius.xs,
    },
  },
  
  // List styles
  list: {
    item: {
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.accents_2,
    },
    lastItem: {
      borderBottomWidth: 0,
    },
  },
  
  // Divider
  divider: {
    height: 1,
    backgroundColor: theme.colors.accents_2,
    marginVertical: theme.spacing.md,
  },
  
  // Badge
  badge: {
    default: {
      backgroundColor: theme.colors.accents_2,
      color: theme.colors.text,
      borderRadius: theme.radius.pill,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 2,
      fontSize: theme.fontSizes.tiny,
    },
    primary: {
      backgroundColor: theme.colors.primaryAccent,
      color: theme.colors.foreground,
    },
    success: {
      backgroundColor: theme.colors.success,
      color: theme.colors.foreground,
    },
    error: {
      backgroundColor: theme.colors.error,
      color: theme.colors.foreground,
    },
    warning: {
      backgroundColor: theme.colors.warning,
      color: theme.colors.foreground,
    },
  },
};
